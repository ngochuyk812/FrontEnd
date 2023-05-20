import './style.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterProducts} from "../../redux/slice/productSlice";
import {getCountry, getColors, filter} from "./javascript";

export const Filter = ({setSearch, search})=>{
    const products = useSelector(state => state.products.products)
    const STEP  = 5
    const MIN =0
    const MAX = 800
    const [minRange, setMinRange] = useState(0)
    const [maxRange, setMaxRange] = useState(800)
    const [category, setCategory] = useState('')
    const [colors, setColors] = useState([])
    const [country, setCountry] = useState('')

    const dispatch = useDispatch()
    const handleMinChange = (e) => {
        e.preventDefault();
        const newMinVal = Math.min(+e.target.value, maxRange - STEP);
        setMinRange(newMinVal);
    };
    const minPos = ((minRange - MIN) / (MAX - MIN)) * 100;
    const maxPos = ((maxRange - MIN) / (MAX - MIN)) * 100;
    const handleMaxChange = e => {
        e.preventDefault();
        const newMaxVal = Math.max(+e.target.value, minRange + STEP);
        setMaxRange(newMaxVal);
    };
    const handleCategory = (e)=>{
        if(e === category)
            setCategory('')
        else
            setCategory(e)
    }
    const handleChangeContry = (e)=>{
        setCountry(e.target.value)
    }
    const handleColor = (color) =>{
      let colorsFilter =  colors.filter(tmp=>tmp === color)
        if(colorsFilter.length === 0)
            setColors([...colors, color])
        else
            setColors(colors.filter(tmp=>tmp !== color))
    }
    useEffect(()=>{
        dispatch(filterProducts(filter({minRange,maxRange,category,colors,country, search}, products)))
    },[minRange,maxRange,category,colors,country, search])
    return (

        <div className="container-fluid filter-page">
            <div className="row" id="fs_app">
                <section className="col-12" id="fs_header_bar">
                    <div className="row">
                        <div className="col-2">
                            <i className="fa fa-chevron-left" />
                        </div>
                        <div className="col-10" id="fs_page_title">
                            Filters
                        </div>
                    </div>
                </section>
                <section className="col-12" id="fs_price_body">
                    <div>
              <span className="heading">
                By Price
              </span>
                        <div className="wrapper">
                            <div className="input-wrapper">
                                <input
                                    className="input"
                                    type="range"
                                    value={minRange}
                                    min={MIN}
                                    max={MAX}
                                    step={STEP}
                                    onChange={handleMinChange}
                                />
                                <input
                                    className="input"
                                    type="range"
                                    value={maxRange}
                                    min={MIN}
                                    max={MAX}
                                    step={STEP}
                                    onChange={handleMaxChange}
                                />
                            </div>

                            <div className="control-wrapper">
                                <div className="control" style={{left: `${minPos}%`}}/>
                                <div className="rail">
                                    <div
                                        className="inner-rail"
                                        style={{left: `${minPos}%`, right: `${100 - maxPos}%`}}
                                    />
                                </div>
                                <div className="control" style={{left: `${maxPos}%`}}/>
                            </div>
                        </div>
                        <div>
                            <ul>

                                <li>${minRange}</li>
                                <li>${maxRange}</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="col-12" id="fs_distance_body">
            <span className="heading">
              By Country
            </span>
                    <div className="contents">
                        <select className='sel_country'
                                value={country}
                                onChange={handleChangeContry}
                        >
                            <option value=''>Country</option>
                            {getCountry(products).map(tmp=>{
                                return (<option key={tmp} value={tmp}>{tmp}</option>)
                            })}
                        </select>
                    </div>
                </section>
                <section className="col-12" id="fs_time_body">
            <span className="heading">
              By Category
            </span>
                    <div className="contents">
                        <ul>
                            <li className={category === 'smart' ?"category active" : "category "} onClick={()=>handleCategory('smart')}>
                                <span>Smart</span>
                                <span className="text-right" />
                            </li>
                            <li className={category === 'classic' ?"category active" : "category "} onClick={()=>handleCategory('classic')}>
                                <span>Classic</span>
                                <span className="text-right">
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="col-12" id="fs_rating">
            <span className="heading">
              By Color
            </span>
                    <div className="contents" style={{display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap', } }>
                        {getColors(products).map(tmp=>{
                            return (<div  style={
                                colors.filter(tmp2=>tmp2 === tmp).length !== 0 ?
                                    {backgroundColor:tmp, width:30, height: 30, border:'2px solid red'} :
                                    {backgroundColor:tmp, width:30, height: 30, border:'1px solid black'}
                            } onClick={()=>handleColor(tmp)}></div>)
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}