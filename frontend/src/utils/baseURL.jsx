export const GET_ALL_VEHICLES=`/vehicle`

export const GO_LIVE=`/vehicle/update-visibility`

export const DELETE_INQUIRY=(item)=>`/inquiry/${item._id}`

export const ADD_INVOICE=`/invoice`

export const UPDATE_INVOICE=(id)=>`/invoice/${id}`

export const DELETE_INVOICE=(item)=>`/invoice/${item._id}`

export const DELETE_CASHBOOK=(item)=>`/cashbook/${item._id}`

export const DELETE_QUOTATION=(item)=>`/quotation/${item._id}`


export const ANSWER_INQUIRY=(id)=>`/inquiry/send-email/${id}`

export const ADD_CASHBOOK=`/cashbook`

export const UPDATE_CASH_BALANCE=`/cashbook/update-balance`

export const ADD_QUOTATION=`/quotation`