import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * AttributeCheckboxes component renders a list of checkboxes for the given attributes.
 * @param {Object} props - The component props.
 * @param {string[]} props.attrs - The list of attributes to render as checkboxes.
 * @returns {JSX.Element} The AttributeCheckboxes component.
 */
export default function AttributeCheckboxes({ attrs }) {
    const checkboxes = attrs.map(
        (attr, idx) => 
        <FormControlLabel name={"check" + idx} key={idx} control={<Checkbox defaultChecked></Checkbox>} label={attr} value={attr}>
        </FormControlLabel>)
    return (
        <FormGroup>
            {checkboxes}
        </FormGroup>
    );
}