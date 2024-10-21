import React from 'react'
import RegistrationStepper from "@/components/parts/tutor/RegistrationStepper";

const Page = async ({}: { params: { id: string } }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '100%'}}>
          <RegistrationStepper />
        </div>
      </div>
    )
}

export default Page