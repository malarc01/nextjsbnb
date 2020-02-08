import { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { DateUtils } from 'react-day-picker'


import dateFnsFormat from 'date-fns/esm/format/index'
// import { format } from 'date-fns'
import dateFnsParse from 'date-fns/parse'

const parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale })
    return DateUtils.isDate(parsed) ? parsed : null
}


const formatDate = (date, format, locale) => {
    dateFnsFormat(date, format, { locale })
}

const format = 'dd MMM yyyy'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)



export default () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    return (
        <div className='date-range-picker-container'>
            <div>
                <label>From:</label>
                <DayPickerInput
                    formatDate={formatDate}
                    format={format}
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), format)}`}
                    dayPickerProps={{
                        modifiers: {
                            disabled: {
                                before: new Date()
                            }
                        }
                    }}
                    onChange={day => {
                        setStartDate(day)
                    }}
                />
            </div>
            <div>
                <label>To:</label>
                <DayPickerInput
                    formatDate={formatDate}
                    format={format}
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), format)}`}
                    dayPickerProps={{
                        modifiers: {
                            disabled: [
                                new Date(),
                                {
                                    before: new Date()
                                }
                            ]
                        }
                    }}
                    onChange={day => {
                        setEndDate(day)
                    }}
                />
            </div>

            <style jsx>
                {`
            .date-range-picker-container div{
                display:grid;
                border:1px solid #ddd;
                grid-template-columns:30% 70%;
                padding:10px;
                

            }
            label{
                padding-top:10px;

            }
            `}
            </style>
            <style jsx global>{`
        .DayPickerInput input{
            width:120px;
            padding:10px;
            font-size:16px;

        }`}

            </style>

        </div>

    )
}
