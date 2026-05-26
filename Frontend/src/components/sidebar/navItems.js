import {
    LayoutDashboard,
    Settings,
    User,
    LogOut,
    Building,
    MapPin,
    Image as ImageIcon,
    Video,
    PlusCircle,
    Pencil,
    Trash2,
    FolderKanban,
    FileText,
} from "lucide-react";

export const mainSidebarItems = [
    {
        section: "Overview",

        items: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },

    {
        section: "Projects",

        items: [
            {
                name: "All Projects",
                path: "/dashboard/all-projects",
                icon: FolderKanban,
            },

            {
                name: "Create Project",
                path: "/dashboard/create-project",
                icon: PlusCircle,
            },

            {
                name: "Edit Project",
                path: "/dashboard/projects",
                icon: Pencil,
            },

            {
                name: "Delete Project",
                path: "/dashboard/delete-projects",
                icon: Trash2,
                danger: true,
            },

        ],
    },

  

    {
        section: "Administration",

        items: [
            {
                name: "Account Profile",
                path: "/dashboard/profile",
                icon: User,
            },

            {
                name: "Logout",
                path: "/dashboard/logout",
                icon: LogOut,
                danger: true,
            },
        ],
    },
];

