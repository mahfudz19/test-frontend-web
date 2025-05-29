"use client";
import { useRouter } from "next/navigation";
import Avatar from "src/components/ui/Avatar";
import Link from "src/components/ui/Link";
import Menu from "src/components/ui/Menu/";
import MenuClickHook from "src/components/ui/Menu/MenuClickHook";
import MenuItem from "src/components/ui/Menu/MenuItem";

const HeaderAvatar = () => {
  const { button, menu } = MenuClickHook();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  return (
    <>
      <div className="flex items-center space-x-2" {...button}>
        <Avatar src="#" alt={"James Dean"}>
          J
        </Avatar>
        <Link href="#" className="text-white">
          James Dean
        </Link>
      </div>
      <Menu anchor="bottom-end" {...menu}>
        <MenuItem href="/settings" Link={Link} onClick={menu.onClose}>
          Setting
        </MenuItem>
        <MenuItem href="#" Link={Link} onClick={menu.onClose}>
          Ganti Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderAvatar;
