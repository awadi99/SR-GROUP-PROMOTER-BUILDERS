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
                path: "/dashboard/projects/edit",
                icon: Pencil,
            },

            {
                name: "Delete Project",
                path: "/dashboard/projects/delete",
                icon: Trash2,
                danger: true,
            },

        ],
    },

    {
        section: "Project Media",

        items: [
            {
                name: "Project Gallery",
                path: "/dashboard/project/gallery",
                icon: ImageIcon,
            },

            {
                name: "Project Videos",
                path: "/dashboard/project/videos",
                icon: Video,
            },

            {
                name: "Location & Maps",
                path: "/dashboard/project/location",
                icon: MapPin,
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

