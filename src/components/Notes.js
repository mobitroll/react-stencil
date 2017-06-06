import React from 'react'
import PropTypes from 'prop-types'

const Notes = ({notes}) => (notes && (
  <aside>
    <h2>
      Notes
    </h2>

    {Object.keys(notes).map(group => (
      <div
        key={group}>
        <h3>
          {group}
        </h3>
        {notes[group]}
      </div>
    ))}
  </aside>
)) || null

Notes.propTypes = {
  notes: PropTypes.object
}

export default Notes
