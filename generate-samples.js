const XLSX = require('xlsx');

// Sample audit data
const sampleData = [
    {
        "Transaction ID": "TXN001",
        "Date": "2024-01-15",
        "Department": "Finance",
        "Amount": 15000,
        "Status": "Approved",
        "Auditor": "John Smith"
    },
    {
        "Transaction ID": "TXN002",
        "Date": "2024-01-16",
        "Department": "HR",
        "Amount": 8500,
        "Status": "Pending",
        "Auditor": "Jane Doe"
    },
    {
        "Transaction ID": "TXN003",
        "Date": "2024-01-17",
        "Department": "IT",
        "Amount": 22000,
        "Status": "Approved",
        "Auditor": "Mike Johnson"
    },
    {
        "Transaction ID": "TXN004",
        "Date": "2024-01-18",
        "Department": "Marketing",
        "Amount": 12500,
        "Status": "Rejected",
        "Auditor": "Sarah Williams"
    },
    {
        "Transaction ID": "TXN005",
        "Date": "2024-01-19",
        "Department": "Finance",
        "Amount": 18700,
        "Status": "Approved",
        "Auditor": "John Smith"
    },
    {
        "Transaction ID": "TXN006",
        "Date": "2024-01-20",
        "Department": "Operations",
        "Amount": 9800,
        "Status": "Pending",
        "Auditor": "Emily Brown"
    },
    {
        "Transaction ID": "TXN007",
        "Date": "2024-01-21",
        "Department": "IT",
        "Amount": 31000,
        "Status": "Approved",
        "Auditor": "Mike Johnson"
    },
    {
        "Transaction ID": "TXN008",
        "Date": "2024-01-22",
        "Department": "HR",
        "Amount": 7200,
        "Status": "Approved",
        "Auditor": "Jane Doe"
    },
    {
        "Transaction ID": "TXN009",
        "Date": "2024-01-23",
        "Department": "Marketing",
        "Amount": 14500,
        "Status": "Pending",
        "Auditor": "Sarah Williams"
    },
    {
        "Transaction ID": "TXN010",
        "Date": "2024-01-24",
        "Department": "Finance",
        "Amount": 25000,
        "Status": "Approved",
        "Auditor": "John Smith"
    }
];

// Create Excel file
const worksheet = XLSX.utils.json_to_sheet(sampleData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Data");
XLSX.writeFile(workbook, "sample-audit-data.xlsx");

// Create CSV file
const csv = XLSX.utils.sheet_to_csv(worksheet);
require('fs').writeFileSync('sample-audit-data.csv', csv);

console.log('✅ Sample files created successfully!');
console.log('   - sample-audit-data.xlsx');
console.log('   - sample-audit-data.csv');
