
/// <reference types="vite/client" />

// Add jsPDF-autotable type declaration
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
