import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import dateFnsFormat from 'date-fns-format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils } from 'react-day-picker'
import { format } from 'date-fns'

const parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale })
    return DateUtils.isDate(parsed) ? parsed : null
}


const formatDate = (date, format, locale) => {
    dateFnsFormat(date, format, { locale })
}

export default () => (
    <div className='date-range-picker-container'>
        <div>
            <label>From:</label>
            <DayPickerInput
                formatDate={formatDate}
                format={format}
                parseDate={parseDate}
                placeholder={`${dateFnsFormat(new Date(), format)}`}
            />
        </div>
        <div>
            <label>To:</label>
            <DayPickerInput />
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