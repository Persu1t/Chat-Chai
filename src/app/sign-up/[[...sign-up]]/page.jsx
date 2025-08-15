import { SignUp } from '@clerk/nextjs'

// custom SignUp component for Clerk
export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp/>
    </div>
  )
}