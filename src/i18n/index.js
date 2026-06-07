import { createI18n } from "vue-i18n";

const messages = {
  en: {
    male: "Male",
female: "Female",

lessThan50: "Less than 50",
greaterThan50: "Greater than 50",

name: "Name",
email: "Email",
phone: "Phone",
age: "Age",
gender: "Gender",
bloodGroup: "Blood Group",
actions: "Actions",
    usermanagement:"User Management",
    save: "Save",
    page:"Page",
    prev:"Prev",
    next:"Next",
    manageUsers: "Manage Users",
    searchPlaceholder: "Search User",
    allGender: "All Gender",
    allAges: "All Ages",
    sortAge: "Sort by Age",
    sortNumber: "Sort by Number",
    addUser: "Add User",
    cancel: "Cancel",
    saveheightWeight: "Save Height & Weight",
    
  },

  hi: {
    male: "पुरुष",
female: "महिला",

lessThan50: "50 से कम",
greaterThan50: "50 से अधिक",
usermanagement:"यूज़र मैनेजमेंट ",
name: "नाम",
email: "ईमेल",
phone: "फ़ोन",
age: "उम्र",
gender: "जेंडर",
bloodGroup: "ब्लड ग्रुप",
actions: "एक्शन",
    save: "सेव",
    page: "पेज",
prev: "पिछला",
next: "अगला",
    

manageUsers: "यूज़र मैनेज करें",
searchPlaceholder: "यूज़र खोजें",
allGender: "सभी जेंडर",
allAges: "सभी उम्र",
sortAge: "उम्र अनुसार",
sortNumber: "नंबर अनुसार",
addUser: "यूज़र जोड़ें",
cancel: "रद्द करें",


    saveheightWeight: "ऊंचाई/वजन सेव करें",
  }
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "en",
  fallbackLocale: "en",
  messages:messages,
});

export default i18n;