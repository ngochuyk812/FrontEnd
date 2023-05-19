import './style.css'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {filterProducts} from "../../redux/slice/productSlice";

export const Filter = ({products})=>{
    const STEP  = 5
    const MIN =0
    const MAX = 800
    const [minRange, setMinRange] = useState(0)
    const [maxRange, setMaxRange] = useState(800)
    const dispatch = useDispatch()
    const handleMinChange = e => {
        e.preventDefault();
        const newMinVal = Math.min(+e.target.value, maxRange - STEP);
         setMinRange(newMinVal);
    };

    const handleMaxChange = e => {
        e.preventDefault();
        const newMaxVal = Math.max(+e.target.value, minRange + STEP);
         setMaxRange(newMaxVal);
    };
    const hanleFilter = ()=>{
        let filter = products.filter(tmp=>tmp.price >= minRange && tmp.price <= maxRange)

    }
    const minPos = ((minRange - MIN) / (MAX - MIN)) * 100;
    const maxPos = ((maxRange - MIN) / (MAX - MIN)) * 100;
    useEffect(()=>{
    },[minRange,maxRange])
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
              By Distance
            </span>
                    <div className="contents">
                        <ul>
                            <li>
                                <span>From 1 km to 3 km</span>
                                <span className="text-right" />
                            </li>
                            <li className="active">
                                <span>From 4 km to 7 km</span>
                                <span className="text-right">
                    <i className="fa fa-check" />
                  </span>
                            </li>
                            <li>
                                <span>From 8 km to 10 km</span>
                                <span className="text-right" />
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="col-12" id="fs_time_body">
            <span className="heading">
              By Time
            </span>
                    <div className="contents">
                        <ul>
                            <li>
                                <span>Less than 30 Min</span>
                                <span className="text-right" />
                            </li>
                            <li>
                                <span>30 Min - 45 Min</span>
                                <span className="text-right" />
                            </li>
                            <li className="active">
                                <span>45 Min - 55 Min</span>
                                <span className="text-right">
                    <i className="fa fa-check" />
                  </span>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="col-12" id="fs_rating">
            <span className="heading">
              By Rating
            </span>
                    <div className="contents">
                        <ul>
                            <li>
                  <span>
                    <i className="fa fa-star dark" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </span>
                                <span className="text-right" />
                            </li>
                            <li>
                  <span>
                    <i className="fa fa-star dark" />
                    <i className="fa fa-star dark" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </span>
                                <span className="text-right" />
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}