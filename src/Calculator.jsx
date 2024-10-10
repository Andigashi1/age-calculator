import { useState } from "react"

import icon from "./assets/images/icon-arrow.svg"

function Calculator() {

    const [ dateInput, setDateInput ] = useState({day: '', month: '', year: ''})
    const [ age, setAge ] = useState(null)
    const [ errors, setErrors ] = useState({day: '', month: '', year: ''})

    const handleChange = (e) => {
        const {name, value} = e.target
        setDateInput(prev => ({...prev, [name]: value }))
        setErrors(prev => ({...prev, [name]: ''}))
    }

    const validateInput = () => {
        
        const newErrors = {day: '', month: '', year: ''}
        let isValid = true

        const {day, month, year} = dateInput
        const inputDay = parseInt(day, 10)
        const inputMonth = parseInt(month, 10)
        const inputYear = parseInt(year, 10)

        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1
        const currentDay = currentDate.getDate()

        if(!day) {
            newErrors.day = 'Field is Required'
            isValid = false
        } else if (isNaN(inputDay)) {
            newErrors.day = 'Must be a valid day'
            isValid = false
        } else {
            const daysInMonth = new Date(inputYear, inputMonth, 0).getDate()
            if (inputDay < 1 || inputDay > daysInMonth) {
                newErrors.day = 'Must be a valid Date'
                isValid = false
            }
        }

        if (!month) {
            newErrors.month = 'Field is Required'
            isValid = false
        } else if (isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
            newErrors.month = 'Must be a valid month'
            isValid = false
        } else if (inputYear === currentYear && inputMonth > currentMonth) {
            newErrors.year = 'Must be in the past'
            isValid = false 
        }

        if (!year) {
            newErrors.year = 'Field is Required'
            isValid = false
        } else if (isNaN(inputYear)) {
            newErrors.year = 'Must be a valid year'
            isValid = false
        } else if(inputYear > currentYear) {
            newErrors.year = 'Must be in the past'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    
    }
    const calculateAge = () => {

        if (validateInput()) {
            const {day, month, year} = dateInput
            const birthDate = new Date(year, month - 1, day)
            const currentDate = new Date()

            let days = currentDate.getDate() - day
            let months = (currentDate.getMonth() + 1) - month
            let years = currentDate.getFullYear() - birthDate.getFullYear()

            if (days < 0) {
                months--
                const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                days += prevMonthDate.getDate()

            }

            if (months < 0) {
                years--
                months+= 12
            }

            setAge({days, months, years})

        }
    }


  return (
    <div className="bg-white py-10 px-12 max-lg:px-6 rounded-3xl rounded-ee-[10rem] max-md:w-full w-screen max-w-screen-md">
        <div className="flex items-end justify-between gap-20 border-b-2 pb-16 relative">
            <div className="flex gap-10">
                <section>
                    <label htmlFor="day" className={`form-info ${errors.day ? 'text-p-red': 'text-smokey'}`}>DAY</label>
                    <input type="text"
                    name="day"
                    value={dateInput.day}
                    onChange={handleChange}
                    className={`input ${errors.day ? 'border-p-red': 'border-lightgray'}`}
                    placeholder="DD"/>
                    {errors.day && <p className="text-p-red text-sm mt-2">{errors.day}</p>}
                </section>
                <section>
                    <label htmlFor="month" className={`form-info ${errors.month ? 'text-p-red': 'text-smokey'}`}>MONTH</label>
                    <input type="text"
                    name="month"
                    value={dateInput.month}
                    onChange={handleChange}
                    className={`input ${errors.month ? 'border-p-red': 'border-lightgray'}`}
                    placeholder="MM"/>
                    {errors.month && <p className="text-p-red text-sm mt-2">{errors.month}</p>}
                </section>
                <section>
                    <label htmlFor="year" className={`form-info ${errors.year ? 'text-p-red': 'text-smokey'}`}>YEAR</label>
                    <input type="text"
                    name="year"
                    value={dateInput.year}
                    onChange={handleChange}
                    className={`input ${errors.year ? 'border-p-red': 'border-lightgray'}`}
                    placeholder="YYYY"/>
                    {errors.year && <p className="text-p-red text-sm mt-2">{errors.year}</p>}
                </section>
            </div>

            <button
            onClick={calculateAge} 
            className="bg-p-purple hover:bg-offblack transition-colors w-full max-w-20  max-md:max-w-[70px] p-4
             aspect-square flex justify-center items-center rounded-full absolute bottom-0 right-0 translate-y-1/2 max-md:right-1/2 max-md:translate-x-1/2">
                <img src={icon} alt="arrow down" className="aspect-square w-full" />
            </button>

            

        </div>

        <div className="font-extrabold italic text-8xl max-sm:text-6xl max-md:text-7xl py-8 max-md:pt-12">
            <p><span className="text-p-purple">{age ? age.years : '--'}</span> years</p>
            <p><span className="text-p-purple">{age ? age.months : '--'}</span> months</p>
            <p><span className="text-p-purple">{age ? age.days: '--'}</span> days</p>
        </div>
    </div>
  )
}

export default Calculator