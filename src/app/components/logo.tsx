import Image from "next/image";

export default function Logo(width: number, height: number){
    let logo = "/images/logo.png";
    return (
        <Image
            src={logo}
            alt="Logo"
            width={width}
            height={height}
        />
    );
}