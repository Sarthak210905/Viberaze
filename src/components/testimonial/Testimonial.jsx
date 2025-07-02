import { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <div>
            {/* Testimonials removed - no fake reviews */}
        </div>
    )
}

export default Testimonial