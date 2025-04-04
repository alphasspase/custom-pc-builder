import { Button } from "@/components/ui/button"
import Logo from "./Logo"
import NavLink from "./NavLink"
import MobileNav from "./MobileNav"




export default function Navbar() {


    return (

        <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-6 lg:gap-10">
                <Logo />
            </div>

            <NavLink />

            <div className="flex items-center gap-4">
                <Button variant="outline" className="hidden md:flex">
                    Start Biding
                </Button>


                <MobileNav />


            </div>
        </div>

    )
}

