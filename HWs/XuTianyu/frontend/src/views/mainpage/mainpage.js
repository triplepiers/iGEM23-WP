import React, { useEffect, useState } from 'react'
import './mainpage.css'
import { SearchOutlined, CloseOutlined, VideoCameraOutlined, DownOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
export default function Mainpage() {
    const history = useHistory()
    /*查询页面
    0-电影页 1-演员页 2-资讯页 */
    const [status, setStatus] = useState(0)
    /*  电影页筛选器  */
    /*类型
    0-全部 1-喜剧 2-动作 3-爱情 4-科幻 5-悬疑 6-恐怖 7-其他 */
    const [genre, setGenre] = useState(0) //
    /*地区
    0-全部 1-欧美 2-大陆 3-港台 4-日韩 5-东南亚 6-其他 */
    const [region, setRegion] = useState(0)
    /*上映时间
    0-全部 1-今年 2-近三年 3-近五年 4-近十年 5-更早 */
    const [showtime, setShowtime] = useState(0)
    /* 
    0-默认 1-高分优先 2-最新优先*/
    const [sortorder,setSortorder] = useState(0)
    /*  演员页筛选器  */
    /*性别
    0-全部 1-男 2-女 */
    const [gender, setGender] = useState(0)
    /*国籍
    0-全部 1-欧美 2-中国 3-日韩 4-东南亚 5-其他 */
    const [nation, setNation] = useState(0)

    const [defaultmovielist,setDefaultmovielist] = useState([]) 
    const [movielist, setMovielist] = useState([])
    const [actorlist, setActorlist] = useState([])
    const [recommendlist, setRecommendlist] = useState([])

    useEffect(() => {
        fetch('http://localhost:5300/movielist')
            .then(response => response.json())
            .then(json => {setDefaultmovielist(json); setMovielist(json)})
            .catch(err => console.log('Request Failed', err));
        fetch(`http://localhost:5300/actorlist`)
            .then(response => response.json())
            .then(json => setActorlist(json))
            .catch(err => console.log('Request Failed', err));
        fetch('http://localhost:5300/recommend')
            .then(response => response.json())
            .then(json => setRecommendlist(json))
            .catch(err => console.log('Request Failed', err));
    }, []);
    const LinkToMovie = (id) => {
        var queryString = id !== '' ? ("id=" + encodeURIComponent(id)) : '';
        var newPath = "/movie?" + queryString;
        history.push(newPath);
    }
    const LinkToActor = (id) => {
        var queryString = id !== '' ? ("id=" + encodeURIComponent(id)) : '';
        var newPath = "/actor?" + queryString;
        history.push(newPath);
    }
    const SortArray = (index) =>{
        switch(index){
            case 0:
                setMovielist(defaultmovielist);
                break;
            case 1:
                const RatePriorMovieList = [...movielist].sort((a, b) => b.rate - a.rate);
                setMovielist(RatePriorMovieList);
                break;
            case 2:
                const TimePriorMovieList = [...movielist].sort((a, b) => b.releaseDate.split('-').join('') - a.releaseDate.split('-').join(''));
                setMovielist(TimePriorMovieList);
                break;
            default:break;
        }
        setSortorder(index)
    }
    return (
        <div className='mainpage_container'>
            <div className='mainpage_nav'>
                <img src='./images/title.png' alt='' style={{
                    width: '140px',
                    marginLeft: '30px'
                }} onClick={() => {
                    history.push('/home')
                }} />
                <div className='mainpage_searchbox'>
                    <input id='searchboxinput'
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter') document.getElementById('searchbutton').click()
                        }} />
                    <CloseOutlined id='closebutton' onClick={() => {
                        document.getElementById('searchboxinput').value = ''
                    }} />
                    <span style={{ marginLeft: '10px', marginRight: '12px', color: 'rgb(255,255,255,0.2)' }}>|</span>
                    <SearchOutlined id='searchbutton' onClick={() => {
                        const data = document.getElementById('searchboxinput').value;
                        if (data !== '') {
                            var queryString = "query=" + encodeURIComponent(data);
                            var newPath = "/home?" + queryString;
                            history.push(newPath);
                        }
                    }} />
                </div>
            </div>
            <div className='mainpage_filter'>
                <ul className='filter_container'>
                    <li className={status === 0 && 'active_item'} onClick={() => { setStatus(0); setGenre(0); setRegion(0); setShowtime(0) }}><VideoCameraOutlined /><span style={{ marginLeft: '10px' }}>电影({movielist.length})</span></li>
                    <li className={status === 1 && 'active_item'} onClick={() => { setStatus(1); setGender(0); setNation(0) }}><VideoCameraOutlined /><span style={{ marginLeft: '10px' }}>演员({actorlist.length})</span></li>
                    <li className={status === 2 && 'active_item'} onClick={() => { setStatus(2) }}><VideoCameraOutlined /><span style={{ marginLeft: '10px' }}>资讯(14)</span></li>
                </ul>
                {
                    status === 0 ?
                        <ul className='type_container'>
                            <li>
                                <span style={{ marginRight: '5px' }}>类型</span><DownOutlined />
                                <ul>
                                    <li className={genre === 0 ? 'active' : null} onClick={() => { setGenre(0) }}>全部</li>
                                    <li className={genre === 1 ? 'active' : null} onClick={() => { setGenre(1) }}>喜剧</li>
                                    <li className={genre === 2 ? 'active' : null} onClick={() => { setGenre(2) }}>动作</li>
                                    <li className={genre === 3 ? 'active' : null} onClick={() => { setGenre(3) }}>爱情</li>
                                    <li className={genre === 4 ? 'active' : null} onClick={() => { setGenre(4) }}>科幻</li>
                                    <li className={genre === 5 ? 'active' : null} onClick={() => { setGenre(5) }}>悬疑</li>
                                    <li className={genre === 6 ? 'active' : null} onClick={() => { setGenre(6) }}>恐怖</li>
                                    <li className={genre === 7 ? 'active' : null} onClick={() => { setGenre(7) }}>其他</li>
                                </ul>
                            </li>
                            <li>
                                <span style={{ marginRight: '5px' }}>地区</span><DownOutlined />
                                <ul>
                                    <li className={region === 0 ? 'active' : null} onClick={() => { setRegion(0) }}>全部</li>
                                    <li className={region === 1 ? 'active' : null} onClick={() => { setRegion(1) }}>欧美</li>
                                    <li className={region === 2 ? 'active' : null} onClick={() => { setRegion(2) }}>大陆</li>
                                    <li className={region === 3 ? 'active' : null} onClick={() => { setRegion(3) }}>港台</li>
                                    <li className={region === 4 ? 'active' : null} onClick={() => { setRegion(4) }}>日韩</li>
                                    <li className={region === 5 ? 'active' : null} onClick={() => { setRegion(5) }}>东南亚</li>
                                    <li className={region === 6 ? 'active' : null} onClick={() => { setRegion(6) }}>其他</li>
                                </ul>
                            </li>
                            <li>
                                <span style={{ marginRight: '5px' }}>上映时间</span><DownOutlined />
                                <ul>
                                    <li className={showtime === 0 ? 'active' : null} onClick={() => { setShowtime(0) }}>全部</li>
                                    <li className={showtime === 1 ? 'active' : null} onClick={() => { setShowtime(1) }}>今年</li>
                                    <li className={showtime === 2 ? 'active' : null} onClick={() => { setShowtime(2) }}>近3年</li>
                                    <li className={showtime === 3 ? 'active' : null} onClick={() => { setShowtime(3) }}>近5年</li>
                                    <li className={showtime === 4 ? 'active' : null} onClick={() => { setShowtime(4) }}>近10年</li>
                                    <li className={showtime === 5 ? 'active' : null} onClick={() => { setShowtime(5) }}>更早</li>
                                </ul>
                            </li>
                            <li>
                                <span style={{ marginRight: '5px' }}>排序</span><DownOutlined />
                                <ul>
                                    <li className={sortorder === 0 ? 'active' : null} onClick={() => { SortArray(0) }}>默认</li>
                                    <li className={sortorder === 1 ? 'active' : null} onClick={() => { SortArray(1) }}>高分优先</li>
                                    <li className={sortorder === 2 ? 'active' : null} onClick={() => { SortArray(2) }}>最新优先</li>
                                </ul>
                            </li>
                        </ul>
                        :
                        status === 1 ?
                            <ul className='type_container'>
                                <li>
                                    <span style={{ marginRight: '5px' }}>性别</span><DownOutlined />
                                    <ul>
                                        <li className={gender === 0 ? 'active' : null} onClick={() => { setGender(0) }}>全部</li>
                                        <li className={gender === 1 ? 'active' : null} onClick={() => { setGender(1) }}>男</li>
                                        <li className={gender === 2 ? 'active' : null} onClick={() => { setGender(2) }}>女</li>
                                    </ul>
                                </li>
                                <li>
                                    <span style={{ marginRight: '5px' }}>国籍</span><DownOutlined />
                                    <ul>
                                        <li className={nation === 0 ? 'active' : null} onClick={() => { setNation(0) }}>全部</li>
                                        <li className={nation === 1 ? 'active' : null} onClick={() => { setNation(1) }}>欧美</li>
                                        <li className={nation === 2 ? 'active' : null} onClick={() => { setNation(2) }}>中国</li>
                                        <li className={nation === 3 ? 'active' : null} onClick={() => { setNation(3) }}>日韩</li>
                                        <li className={nation === 4 ? 'active' : null} onClick={() => { setNation(4) }}>东南亚</li>
                                        <li className={nation === 5 ? 'active' : null} onClick={() => { setNation(5) }}>其他</li>
                                    </ul>
                                </li>
                            </ul>
                            :
                            <ul>

                            </ul>
                }
            </div>
            <div className='mainpage_content'>
                <div className='left_board'>
                    {status === 0 ? (
                        <ul>
                            {movielist.map(movie => (
                                <li key={movie.id} onClick={() => { LinkToMovie(movie.id) }}>
                                    <img src={movie.posterURL} alt='' />
                                    <div className='dscp'>
                                        <h3 className='title'>{movie.title}({movie.releaseDate.split('-')[0]})</h3>
                                        <div>
                                            <p>{movie.rate}</p>
                                            <Rate allowHalf disabled defaultValue={movie.rate / 2} />
                                        </div>
                                        <p className='director'>导演：{(movie.director.join('/'))}</p>
                                        <p className='actor'>主演：{movie.actor.join('/')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                        :
                        status === 1 ? (
                            <ul className='actorlist'>
                                {actorlist.map((actor) => {
                                    var targetgender = '';
                                    switch (gender) {
                                        case 0: break;
                                        case 1: targetgender = 'Female'; break;
                                        case 2: targetgender = 'Male'; break;
                                        default: break
                                    }
                                    if (actor.gender !== targetgender) {
                                        return (
                                            <li key={actor.id} onClick={()=>{LinkToActor(actor.id)}}>
                                                <img src={actor.image} alt='' />
                                                <div className='dscp'>
                                                    <h3 className='title'>{actor.name}</h3>
                                                    <p style={{ fontSize: '14px' }}>{actor.nationality}</p>
                                                    <p style={{ marginTop: '10px' }}>{actor.birthdate}</p>
                                                </div>
                                            </li>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                            </ul>
                        )
                            :
                            (
                                <ul>

                                </ul>
                            )}
                </div>
                <div className='right_board'>
                    {
                        status === 0 ? (
                            <div className='recommendmovie'>
                                <h2>今日推荐</h2>
                                <ul>
                                    {recommendlist.map(movie => (
                                        <li>
                                            <img src={movie.posterURL} alt='' />
                                            <div className='dscp'>
                                                <p className='title'>{movie.title}</p>
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        )
                            :
                            status === 1 ? (
                                <div className='hotactor'>
                                    <h2>热门演员</h2>
                                    <ul>
                                        {actorlist.slice(0,3).map((actor,index) => (
                                            <li>
                                                <img src={actor.image} alt='' />
                                                <div className='rank'>TOP {index+1}</div>
                                                <div className='dscp'>
                                                    <p style={{fontSize:'16px',marginBottom:'10px'}}>{actor.name}</p>
                                                    <p style={{fontSize:'12px',color:'rgb(255,255,255,0.4)'}}>{actor.nationality}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                                :
                                (
                                    <div></div>
                                )}

                </div>
            </div>
        </div>
    )
}
