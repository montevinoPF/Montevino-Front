
/**@type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "blue-001": "#1DA1F2",
                "green-001": "#14171A",
        },
        spacing: {
            1: "8px",
            2: "12px",
            3: "16px",
            4: "24px",
            5: "32px",
            6: "48px",
    },
    plugins: [],
}
    }
}