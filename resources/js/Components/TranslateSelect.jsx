import React from "react";
import { useEffect } from "react";

const TranslateSelect = () => {
    useEffect(() => {
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    autoDisplay: "false",
                    includedLanguages: "fr,en,es,de,uk,it",
                    layout: window.google.translate.TranslateElement
                        .InlineLayout.HORIZONTAL,
                    gaTrack: true,
                    gaId: "UA-12345678-1",
                    floatPosition: 0,
                    disableAutoTranslation: true,
                    multilanguagePage: true,
                    dataDefaultLanguage: "en",
                },
                "google_translate_element"
            );

            const googleDiv = document.querySelector(
                "#google_translate_element .skiptranslate"
            );
            const googleDivChild = document.querySelector(
                "#google_translate_element .skiptranslate div"
            );
            googleDivChild.nextElementSibling.remove();

            Array.from(googleDiv.childNodes).forEach((node) => {
                if (
                    node.nodeType === Node.TEXT_NODE &&
                    node.textContent.trim() !== ""
                ) {
                    node.remove();
                }
            });
        };

        window.googleTranslateElementInit = googleTranslateElementInit;

        const script = document.createElement("script");
        script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&hl=en";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            delete window.googleTranslateElementInit;
            document.body.removeChild(script);
        };
    }, []);

    return <div id="google_translate_element" data-default-language="en"></div>;
};

export default TranslateSelect;
