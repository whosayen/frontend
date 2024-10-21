import * as React from 'react';
import {useEffect} from 'react';
import {AutocompleteElement} from "react-hook-form-mui";
import { CountryDto } from "@/lib/types/dtoTypes";
import {getAllCountries} from "@/lib/api";

export default function CountryComboBox() {

    const [countries, setCountries] = React.useState<CountryDto[]>([]);
    const getCountries = async () => {
        const countries = await getAllCountries()
        setCountries(countries)
    }

    useEffect(() => {
        getCountries()
    }, []);

    return (
        <AutocompleteElement
            name={'country'}
            label={"Country"}
            options={countries}
            autocompleteProps={{
                getOptionLabel: (option) => option.name,
            }}
        />
    );
}