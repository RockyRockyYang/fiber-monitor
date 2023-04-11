import "./ToolBar.css";
import { useContext } from 'react';
import { DatePicker } from 'antd';
import { FiltersContext } from '../../store/filters-context'

const { RangePicker } = DatePicker;

function ToolBar() {
  const filtersCtx = useContext(FiltersContext)
  const rangeOnChange = (rangeValue) => {
    filtersCtx.setFiltersHandler({
      time: rangeValue
    })
  }

  return (
    <div className="toolBar">
      <RangePicker onChange={rangeOnChange} />
    </div>
  )
}

export default ToolBar;