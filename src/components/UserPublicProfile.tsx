import { FullUserDto } from "@/lib/types/dtoTypes"
import React from 'react'

type Props = {
    data: FullUserDto
}

function UserPublicProfile({data}: Props) {
    return (
        <div>
            <h1>UserPublic</h1>
            <h2> User </h2>
            <div>
                <h3> {data.userDto.email} </h3>
                <h3> {data.userDto.id} </h3>
                <h3> {data.userDto.isEnabled} </h3>
                <h3> {data.userDto.role} </h3>
            </div>
            <h2> UserSettings </h2>
            <div>
                <h3> {data.userSettingsDto.firstName} </h3>
                <h3> {data.userSettingsDto.lastName} </h3>
                <h3> {data.userSettingsDto.city} </h3>
                <h3> {data.userSettingsDto.country.code} </h3>
                <h3> {data.userSettingsDto.dateOfBirth} </h3>
                <h3> {data.userSettingsDto.id} </h3>
                <h3> {data.userSettingsDto.phoneNumber} </h3>
                <h3> {data.userSettingsDto.phoneCode} </h3>
                <h3> {data.userSettingsDto.timezone} </h3>
            </div>
        </div>
    )
}

export default UserPublicProfile