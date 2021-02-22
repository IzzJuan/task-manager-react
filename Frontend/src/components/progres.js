import React from 'react'
import PropTypes from 'prop-types'

const progres = ({ percentage }) => {
    return (
        <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${percentage}%` }}>{percentage}%</div>
        </div>
    )
}

progres.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default progres
