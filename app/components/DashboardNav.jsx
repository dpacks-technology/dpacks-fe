import SignOutButton from "@/app/components/SignoutButton";

export default function DashboardNav() {
    return (
        <>
          <div className="bg-secondaryDark p-4 rounded-lg grid justify-end">
              <SignOutButton/>
          </div>
        </>
    )
}