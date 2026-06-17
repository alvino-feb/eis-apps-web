export const menuData = [
  {
    "name": "Dashboard",
    "icon": "home",
    "path": "/"
  },
  {
    "name": "Human Resources",
    "children": [
      {
        "name": "Settings",
        "children": [
          {
            "name": "Organizational Unit",
            "path": "/users"
          },
          {
            "name": "Positions",
            "path": "/roles"
          },
          {
            "name": "Jobs",
            "path": "/roles"
          },
          {
            "name": "Benefits",
            "path": "/roles"
          },
          {
            "name": "Payroll",
            "path": "/roles"
          }
        ]
      },
      {
        "name": "Personnel Information",
        "children": [
          {
            "name": "Personnel",
            "path": "/products"
          },
          {
            "name": "Position",
            "path": "/products"
          }
        ]
      },
      {
        "name": "Sample Page",
        "children": [
          {
            "name": "Page 1",
            "path": "/sample-page/page1"
          },
          {
            "name": "Page 2",
            "path": "/sample-page/page2"
          }
        ]
      },
    ]
  },
  {
    "name": "Purchasing",
    "icon": "file",
    "children": [
      {
        "name": "Master Data",
        "children": [
          {
            "name": "Vendor",
            "path": "/orders"
          },
          {
            "name": "Vendor Type",
            "path": "/orders/create"
          }
        ]
      },
      {
        "name": "Purchase Requisition",
        "children": [
          {
            "name": "Create",
            "path": "/orders"
          },
          {
            "name": "Release",
            "path": "/orders/create"
          },
        ]
      },
      {
        "name": "Purchase Order",
        "children": [
          {
            "name": "Create",
            "path": "/orders"
          },
          {
            "name": "Release",
            "path": "/orders/create"
          }
        ]
      },
      {
        "name": "Goods Receipt",
        "children": [
          {
            "name": "Release",
            "path": "/orders"
          },
          {
            "name": "Invoice",
            "path": "/orders/create"
          }
        ]
      }
    ]
  },
  {
    "name": "Inventory Management",
    "icon": "file",
    "children": [
      {
        "name": "Master Data",
        "children": [
          {
            "name": "Warehouse",
            "path": "/orders"
          },
          {
            "name": "Transaction Type",
            "path": "/orders/create"
          },
          {
            "name": "Transfer Type",
            "path": "/orders/create"
          },
          {
            "name": "COGS",
            "path": "/orders/create"
          }
          
        ]
      },
      {
        "name": "Shipment",
        "children": [
          {
            "name": "Schedule",
            "path": "/orders"
          },
          {
            "name": "Release",
            "path": "/orders/create"
          },
          {
            "name": "Return",
            "path": "/orders/create"
          }
        ]
      },
      {
        "name": "Stock",
        "children": [
          {
            "name": "Inquiry",
            "path": "/orders"
          },
          {
            "name": "Movement/Stock Card",
            "path": "/orders/create"
          },
          {
            "name": "Transaction",
            "path": "/orders/create"
          }
        ]
      }
    ]
  },
  {
    "name": "Sales",
    "icon": "file",
    "children": [
      {
        "name": "Master Data",
        "children": [
          {
            "name": "Product Type",
            "path": "/orders"
          },
          {
            "name": "Sales Type",
            "path": "/orders/create"
          },
          {
            "name": "Product",
            "path": "/orders/create"
          },
          {
            "name": "Customer",
            "path": "/orders/create"
          }
          
        ]
      },
      {
        "name": "Order",
        "children": [
          {
            "name": "Schedule",
            "path": "/orders"
          },
          {
            "name": "Release",
            "path": "/orders/create"
          },
          {
            "name": "Return",
            "path": "/orders/create"
          }
        ]
      },
      {
        "name": "Stock",
        "children": [
          {
            "name": "Inquiry",
            "path": "/orders"
          },
          {
            "name": "Movement/Stock Card",
            "path": "/orders/create"
          },
          {
            "name": "Transaction",
            "path": "/orders/create"
          }
        ]
      }
    ]
  },
  {
    "name": "Finance & Accounting",
    "icon": "file",
    "children": [
      {
        "name": "Master Data",
        "children": [
          {
            "name": "Chart of Account",
            "path": "/orders"
          },
          {
            "name": "Bank Group",
            "path": "/orders"
          },
          {
            "name": "Group",
            "path": "/orders"
          },
          {
            "name": "Bank Type",
            "path": "/orders"
          },
          {
            "name": "Collector",
            "path": "/orders"
          }           
        ]
      },
      {
        "name": "Account Payable",
        "children": [
          {
            "name": "Schedule",
            "path": "/orders"
          },
          {
            "name": "Release",
            "path": "/orders/create"
          },
          {
            "name": "Return",
            "path": "/orders/create"
          }
        ]
      },
      {
        "name": "Account Receivable",
        "children": [
          {
            "name": "Inquiry",
            "path": "/orders"
          },
          {
            "name": "Movement/Stock Card",
            "path": "/orders/create"
          },
          {
            "name": "Transaction",
            "path": "/orders/create"
          }
        ]
      }
    ]
  },
  {
    "name": "Application Setting",
    "icon": "chart",
    "children": [
      {
        "name": "User Management",
        "path": "/reports/sales"
      },
      {
        "name": "Menu",
        "path": "/reports/users"
      }
    ]
  }
]