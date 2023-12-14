import React, { useEffect, useState } from 'react'
import './actorpage.css'
import { SearchOutlined, CloseOutlined, DownOutlined, UpOutlined, FolderOpenTwoTone } from '@ant-design/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Actorpage() {
    const history = useHistory()
    const [info, setInfo] = useState({})
    const [showintro, setShowintro] = useState(1)
    useEffect(() => {
        async function fetchData() {
            // const response = await fetch(`http://localhost:5300/actor?${window.location.href.split('?')[1]}`);
            const response = await fetch(`http://localhost:5300/actorinfo`);
            const json = await response.json();
            setInfo(json);
            console.log(json)
        }
        fetchData()
    }, [])
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
            {info.name && (
                <div className='moviepage_content'>
                    <div className='leftpart'>
                        <div className='upperboard'>
                            <div className='dscp'>
                                <h1>{info.name}<span style={{ marginLeft: '10px', fontSize: '20px', color: 'rgb(185, 185, 185)' }}>{info.englishname}</span></h1>
                                <div>
                                    <img src={info.image} alt='' className='actorimage' />
                                    <div>
                                        <div>性别：{info.gender === 'Male' ? '男' : '女'}</div>
                                        <div>国籍：{info.nationality}</div>
                                        <div>出生日期：{info.birthdate}</div>
                                        <div>职业：{info.job ? info.job.join(' / ') : '暂缺'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='intro'>
                            <h2>影人介绍 <span style={{ fontSize: '12px' }} onClick={() => { setShowintro(showintro === 0 ? 1 : 0) }}>{showintro === 1 ? <DownOutlined /> : <UpOutlined />}</span></h2>
                            {showintro === 1 && <p>{info.introduction}</p>}
                        </div>
                        <div className='masterpiecelist'>
                            <h2>代表作品</h2>
                            {info.masterpiece && (
                                <div>
                                    {info.masterpiece.map(work => (
                                        <div className='masterpiececard'>
                                            {}<img src={work.posterURL} alt='' />
                                            <p>{work.title}<span style={{ color: 'rgb(193,39,45)', fontWeight: 'bold', marginLeft: '5px' }}>{work.rate}</span></p>
                                            <p style={{ marginTop: '3px', color: 'rgb(255,255,255,0.4)' }}>{work.releaseDate.split('-')[0]}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='honor'>
                            <h2>荣誉奖项</h2>
                            {info.honor && (
                                <ul>
                                    <li className='listtitle'>
                                        <div style={{marginLeft:'10px',width:'15px'}}></div>
                                        <div>年份</div>
                                        <div>获奖奖项</div>
                                        <div>获奖作品</div>
                                        <div style={{width:'30px'}}></div>
                                    </li>
                                    {info.honor.map(honor => (
                                        <li className='honoritem'>
                                            {honor.state === "获奖" ? <img src='./images/prize.svg' /> : <img src='./images/failprize.svg' />}
                                            <div>{honor.year}</div>
                                            <div>{honor.title}</div>
                                            <div>{honor.work}</div>
                                            <div>{honor.state}</div>
                                        </li>
                                    ))}
                                </ul>
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
