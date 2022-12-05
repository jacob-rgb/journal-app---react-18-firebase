import { Pagination } from '@mui/material'
import React from 'react'

class CustomButton extends React.Component {

    constructor() {
        super()
    }

    render() {
        return <Pagination count={10} color="primary" />
    }
}

export default CustomButton
