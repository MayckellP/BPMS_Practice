<?php

namespace App\Http\Controllers;

use App\Models\DepartmentProduction;
use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Stock;
use App\Models\ClaimOrder;
use App\Models\Employee;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

//CARBON
use Carbon\Carbon;

class DepartmentProductionController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:goTo_dept_production', ['only'=>['index']]);
        $this->middleware('permission:goTo_dept_production_register', ['only'=>['show']]);
    }

    public function index()
    {
        //ID FOR THE USER
        $userId = Auth::id();
        $registerID = Employee::where('user_id', $userId)->get();
        $employeeID = $registerID[0]->id;


        $employeeChart = DB::table('department_productions')
        ->join('employees', 'department_productions.id_employee', '=', 'employees.id')
        ->select('employees.id', 'employees.name', DB::raw('SUM(department_productions.quantity) AS total_quantity'))
        ->groupBy('employees.id', 'employees.name')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();

        $productsChart = DB::table('department_productions')
        ->join('orders', 'department_productions.id_order', '=', 'orders.id')
        ->select('orders.model', 'orders.color', DB::raw('SUM(department_productions.quantity) AS total_quantity'))
        ->groupBy('orders.model', 'orders.color')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();


        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myOrders = Order::where('user_id', $userId)->get();

        //SHOW MY PERFORMANCE
        $currentMonth = Carbon::now()->format('m');

        
        $myPerformance = DB::table('department_sales')
        ->select(DB::raw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total, SUM(monthly_performance) as total_price'))
        ->groupBy('year', 'month')->where('id_employee', $employeeID)
        ->get();


        return Inertia::render('Dept_Production/Index', 
        [
            'employeeChart' => $employeeChart,
            'employeeID' => $employeeID,
            'productsChart' => $productsChart,
            'myPerformance' => $myPerformance
        ]);

    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }


    public function show($identifier)
    {
        $orderDetailID = $identifier;
        $user_id = Auth::id();
        $employeeData = Employee::where('user_id', $user_id)->get();
        $employees = Employee::select('id', 'name', 'area')->get();
        $sellerID = $employeeData[0]->id;


        $allCompleteTable = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed', 
        'order_details.date_to_produce', 
        'order_details.date_to_deliver', 
        'order_details.sent_to', 
        'order_details.receiver',
        'order_details.foto_1', 'order_details.foto_2')->where('order_details.confirmed', '!=', null)->get();


        $employeesToProduction = Employee::where('area', 'production_department')->where('job_position', 'employee')->get();
        $employeeTable = DB::table('department_productions')
        ->join('employees', 'employees.id', '=', 'department_productions.id_employee')
        ->select('department_productions.*', 
        'employees.id', 
        'employees.user_id', 
        'employees.name', 
        'employees.foto', 
        'employees.area',
        'employees.job_position',
        'employees.email', 'employees.address')->get();

        /* $employeePerformanceDetail = DB::table('department_productions')
        ->join('employees', 'department_productions.id_employee', '=', 'employees.id')
        ->select('employees.id', 'employees.name', DB::raw('YEAR(department_productions.created_at) AS year'), DB::raw('MONTH(department_productions.created_at) AS month'), DB::raw('SUM(department_productions.quantity) AS total_quantity'))
        ->groupBy('employees.id', 'employees.name', DB::raw('YEAR(department_productions.created_at)'), DB::raw('MONTH(department_productions.created_at)'))
        ->get(); */

        $year = Carbon::now()->year;

        $query = "
    SELECT
        employees.id,
        employees.name,
        years.year,
        months.month,
        IFNULL(SUM(dp.quantity), 0) AS total_quantity
    FROM
        (
            SELECT DISTINCT YEAR(created_at) AS year
            FROM department_productions
        ) AS years
    CROSS JOIN
        (
            SELECT 1 AS month UNION ALL
            SELECT 2 AS month UNION ALL
            SELECT 3 AS month UNION ALL
            SELECT 4 AS month UNION ALL
            SELECT 5 AS month UNION ALL
            SELECT 6 AS month UNION ALL
            SELECT 7 AS month UNION ALL
            SELECT 8 AS month UNION ALL
            SELECT 9 AS month UNION ALL
            SELECT 10 AS month UNION ALL
            SELECT 11 AS month UNION ALL
            SELECT 12 AS month
        ) AS months
    INNER JOIN
        (
            SELECT DISTINCT id_employee
            FROM department_productions
        ) AS emp ON 1 = 1
    INNER JOIN
        employees ON emp.id_employee = employees.id
    LEFT JOIN
        department_productions AS dp ON employees.id = dp.id_employee
        AND years.year = YEAR(dp.created_at)
        AND months.month = MONTH(dp.created_at)
    INNER JOIN
        (
            SELECT MAX(MONTH(created_at)) AS max_month
            FROM department_productions
            WHERE YEAR(created_at) = ?
        ) AS max_month_table ON months.month <= max_month_table.max_month
    GROUP BY
        employees.id,
        employees.name,
        years.year,
        months.month
    ORDER BY
        employees.id,
        years.year,
        months.month
";

$employeePerformanceDetail = DB::select($query, [$year]);
    
    
        if($identifier === "register"){
            return Inertia::render('Dept_Production/Register', ['completeTable' => $allCompleteTable]);
        } elseif ($identifier === "EmployeeDetails") {
            return Inertia::render('Dept_Production/EmployeeDetails', 
            ['employeesToProduction' => $employeesToProduction,
            'employeePerformanceDetail' => $employeePerformanceDetail]);
        } else {
            return Inertia::render('Dept_Production/RegisterDetail', 
            [
             'allCompleteTable' => $allCompleteTable, 
             'orderDetailID' => $orderDetailID,
             'employees' => $employees,
             'employeeTable' => $employeeTable
            ]);
        }
        
    }

 
    public function edit(DepartmentProduction $departmentProduction)
    {
        //
    }


    public function update(Request $request, DepartmentProduction $departmentProduction)
    {
        //
    }


    public function destroy(DepartmentProduction $departmentProduction)
    {
        //
    }
}
