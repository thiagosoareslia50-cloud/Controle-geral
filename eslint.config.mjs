import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                // Supabase and other globals that might be used
                supabase: "readonly",
                Swal: "readonly",
                $: "readonly",
                jQuery: "readonly"
            },
            ecmaVersion: 2022,
            sourceType: "script" // Most scripts seem to not be modules
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];
