import React, { useState } from 'react'
import './homepage.css'
import { Carousel } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Homepage() {
  const history = useHistory()
  const [isInputFocused, setIsInputFocused] = useState(false)
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Carousel autoplay pauseOnHover={false}> {/*轮播组件*/}
        <div className='carousel_images'>
          <img src='./images/1.jpeg' alt='' />
          <div className='mask'>
            <p>复仇者联盟4：终局之战<span>181分钟</span></p>
            <p><b>导 演:</b> 安东尼·罗素、乔·罗素</p>
            <p><b>主 演:</b> 小罗伯特·唐尼、克里斯·埃文斯、马克·鲁法洛、克里斯·海姆斯沃斯、斯嘉丽·约翰逊、杰瑞米·雷纳</p>
          </div>
        </div>
        <div className='carousel_images'>
          <img src='./images/2.jpeg' alt='' />
          <div className='mask'>
            <p>信条<span>150分钟</span></p>
            <p><b>导 演:</b> 克里斯托弗·诺兰</p>
            <p><b>主 演:</b> 约翰·大卫·华盛顿、罗伯特·帕丁森、伊丽莎白·德比齐、迈克尔·凯恩、肯尼思·布拉纳</p>
          </div>
        </div>
        <div className='carousel_images'>
          <img src='./images/3.jpeg' alt='' />
          <div className='mask'>
            <p>流浪地球2<span>173分钟</span></p>
            <p><b>导 演:</b> 郭帆</p>
            <p><b>主 演:</b> 吴京、刘德华、李雪健、沙溢、宁理、王智、朱颜曼滋</p>
          </div>
        </div>
        <div className='carousel_images'>
          <img src='./images/4.jpeg' alt='' />
          <div className='mask'>
            <p>捉妖记<span>118分钟</span></p>
            <p><b>导 演:</b> 许诚毅</p>
            <p><b>主 演:</b> 白百何、井柏然、曾志伟、吴君如、姜武</p>
          </div>
        </div>
        <div className='carousel_images'>
          <img src='./images/5.png' alt='' />
          <div className='mask'>
            <p>悬崖之上<span>120分钟</span></p>
            <p><b>导 演:</b> 张艺谋</p>
            <p><b>主 演:</b> 张译、于和伟、秦海璐、朱亚文、刘浩存、倪大红、李乃文、余皑磊、飞凡、雷佳音、沙溢、芮丹尼</p>
          </div>
        </div>
      </Carousel>
      <div className='homepage_nav'>
        <div>
          <img src='./images/logo.png' alt='' style={{
            height: '30px',
            marginLeft: '50px'
          }} />
          <img src='./images/title.png' alt='' style={{
            height: '30px',
            marginLeft: '10px'
          }} />
        </div>

        <div className={`homepage_searchbox ${isInputFocused ? 'focused' : ''}`}>
          <input id='searchboxinput' placeholder='搜索电影 / 演员'
            onFocus={() => { setIsInputFocused(true) }}
            onBlur={() => { setIsInputFocused(false) }}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') document.getElementById('searchbutton').click()
            }} />
          <SearchOutlined id='searchbutton' onClick={() => {
            const data = document.getElementById('searchboxinput').value;
            if(data !== ''){
              var queryString = "query=" + encodeURIComponent(data);
              var newPath = "/home?" + queryString;
              history.push(newPath);
            }
          }} />
        </div>
      </div>
    </div>
  )
}
