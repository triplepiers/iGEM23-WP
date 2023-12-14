import React, { useEffect, useState } from 'react'
import './moviepage.css'
import { SearchOutlined, CloseOutlined, CheckCircleFilled,CommentOutlined,DownOutlined,UpOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Rate } from 'antd'

export default function Moviepage() {
    const history = useHistory()
    const [info, setInfo] = useState({})
    const [myrate, setMyrate] = useState(0)
    const [showplot,setShowplot] = useState(1)

    useEffect(() => {
        async function fetchData() {
            // const response = await fetch(`http://localhost:5300/movie?${window.location.href.split('?')[1]}`);
            const response = await fetch(`http://localhost:5300/movieinfo`);
            const json = await response.json();
            setInfo(json);
        }
        fetchData()
    }, []);

    return (
        <div className='mainpage_container'>
            <div className='mainpage_nav moviepage_nav'>
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
                        }}/>
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
            {info.title && (
                <div className='moviepage_content'>
                    <div className='leftpart'>
                        <div className='upperboard'>
                            <div className='dscp'>
                                <h1>{info.title}</h1>
                                <div>
                                    <img src={info.posterURL} alt='' />
                                    <div>
                                        <div>导演：{info.director.join(' / ')}</div>
                                        <div>编剧：{info.writer.join(' / ')}</div>
                                        <div>主演：{info.actor.join(' / ')}</div>
                                        <div>类型：{info.genre.join(' / ')}</div>
                                        <div>上映时间：{info.releaseDate}</div>
                                        <div>地区：{info.region}</div>
                                        <div>片长：{info.duration}分钟</div>
                                    </div>
                                </div>
                            </div>
                            <div className='rate'>
                                <p>电影评分</p>
                                <div className='rateshow'>
                                    {info.rate}
                                    <div>
                                        <Rate allowHalf disabled style={{ color: 'rgb(193,39,45)', fontSize: '15px' }} defaultValue={info.rate / 2} />
                                        <p>123843人评价</p>
                                    </div>
                                </div>
                                <p>我要评价</p>
                                <div>
                                    <Rate style={{ color: 'white', fontSize: '15px' }} onChange={setMyrate} />
                                    <div style={{ marginLeft: 'auto' }} onClick={() => {
                                        myrate === 0 ? alert("未选择评分") : alert("评价成功！")
                                    }}>
                                        <CheckCircleFilled style={{ marginRight: '3px' }} />
                                        <span>提交</span>
                                    </div>
                                </div>
                                <textarea placeholder='输入评论' style={{ boxSizing: 'border-box', color: 'white', padding: '5px', resize: 'none', marginTop: '10px', width: '100%', height: '120px', backgroundColor: 'transparent', borderStyle: 'none', border: '1px solid rgb(255,255,255,0.1)', borderRadius: '2px' }} />
                            </div>
                        </div>
                        <div className='plot'>
                            <h2>情节梗概 <span style={{fontSize:'12px'}} onClick={()=>{setShowplot(showplot===0?1:0)}}>{showplot===1?<DownOutlined />:<UpOutlined />}</span></h2>
                            {showplot===1 && <p>{info.plot}</p>}
                        </div>
                        <div className='actorlist'>
                            <h2>演职人员</h2>
                            {info.staff && (
                                <div>
                                    {info.staff.map(staff => (
                                        <div className='actorcard'>
                                            <img src={staff.photoURL} alt='' />
                                            <p>{staff.name}</p>
                                            <p style={{ fontSize: '12px', color: 'rgb(255,255,255,0.2' }}>{staff.character}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                        <div className='comments'>
                            <h2>
                                评论
                            </h2>
                            {info.comment && (
                                <div>
                                    {info.comment.map(comment => (
                                        <div>
                                            <CommentOutlined />
                                            <span>{comment.timestamp}</span>
                                            <Rate disabled style={{ color: 'rgb(193,39,45)', fontSize: '15px' }} defaultValue={comment.rate} />
                                            <p>{comment.content}</p>
                                        </div>
                                    ))}
                                </div>

                            )}

                        </div>
                    </div>
                    <div className='rightpart'>

                    </div>
                </div>
            )}
        </div>
    )
}
