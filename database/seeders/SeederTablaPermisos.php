<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//SPATIE
use Spatie\Permission\Models\Permission;

class SeederTablaPermisos extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permisos =[
            //ROLE
            'show-rol',
            'create-rol',
            'edit-rol',
            'delete-rol',

            //BLOG
            'show-blog',
            'create-blog',
            'edit-blog',
            'delete-blog',

            //ORDER
            'show-order',
            'create-order',
            'edit-order',
            'delete-order',

            //WAREHOUSE DEPT.
            //ORDER
            'show-stock',
            'create-stock',
            'edit-stock',
            'delete-stock',

            //SALE DEPT.
            'show-order-sale',
            'create-order-sale',
            'edit-order-sale',
            'delete-order-sale',

            //PRODUCTION DEPT.
            'goTo_dept_production',
            'goTo_dept_production_register',

            //LOGISTIC DEPT.
            'goTo_dept_logistic',
            'goTo_dept_logistic_register',

            //LOGISTIC DEPT. EMPLOYEE
            'goTo_dept_logistic_employee',
            'goTo_dept_logistic_register_employee',

        ];

        foreach($permisos as $permiso){
            Permission::create(['name' => $permiso]);
        }
    }
}
