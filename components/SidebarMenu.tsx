import React from "react";
import { Drawer } from "antd";
import Image from "next/image";
import CallIcon from "@/assets/img/call-btn.png";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks?: { href: string; label: string }[];
}

export default function SidebarMenu({ open, onClose, navLinks }: SidebarMenuProps) {
  const t = useTranslations("nav");
  const phone = useTranslations("phone");
  // Nếu không truyền navLinks thì fallback mặc định
  const links = navLinks || [
    { href: "/", label: "openLetter" },
    { href: "/pricing", label: "pricesList" },
    { href: "/legal", label: "legal" },
    { href: "/docs", label: "guide" },
  ];

  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      width={280}
      styles={{
        body: { padding: 0 },
        header: { display: "none" }
      }}
      closable={false}
    >
      <div className="flex flex-col h-full bg-gray-50">
        {/* Call button + label + số điện thoại */}
        <div className="flex flex-col items-start gap-2 px-6 pt-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#0267AB] rounded-xl p-2 flex items-center justify-center">
              <Image src={CallIcon} alt="Call" width={40} height={40} />
            </div>
            <div className="flex flex-col ml-2">
              <span className="font-bold text-lg text-[#222]">{phone("label")}</span>
              <span className="text-[#0267AB] font-bold text-base">{phone("number")}</span>
            </div>
          </div>
        </div>
        {/* Menu */}
        <nav className="flex flex-col gap-6 px-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#6B7280] text-xl font-medium hover:text-[#0267AB]"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
      </div>
    </Drawer>
  );
} 