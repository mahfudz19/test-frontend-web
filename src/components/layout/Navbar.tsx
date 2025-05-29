import React from "react";
import Container from "../ui/Container";
import Link from "../ui/Link";
import IconLogoIpsum from "../ui/Icon/IconLogoIpsum";
import HeaderAvatar from "src/app/articles/HeaderAvatar";

function Navbar() {
  return (
    <div className="bg-blue-400 text-white">
      <Container className="flex justify-between py-2">
        <Link
          href="/"
          className="flex items-center justify-center my-auto space-x-2 text-white"
        >
          <IconLogoIpsum fontSize={32} />
          <span className="text-base sm:text-lg font-semibold">Logoipsum</span>
        </Link>

        {/* Avatar kanan */}
        <HeaderAvatar />
      </Container>
    </div>
  );
}

export default Navbar;
