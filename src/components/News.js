import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Crypto')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 18 });
  const { data } = useGetCryptosQuery(100);

  console.log(cryptoNews);

  if (!cryptoNews?.value) return 'Loading...';

  return (
    <div>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a crypto'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
            >
              <Option value='All currencies'>All currencies</Option>
              {/* FOR SELF: NOT THE LOGIC ON ADDING SELECT OPTIONS WITH CRYPTO QUERY */}
              {data?.data?.coins.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((newsArticle, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={newsArticle.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{newsArticle.name}</Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={newsArticle?.image?.thumbnail?.contentUrl || demoImage} alt='news image' />
                </div>
                <p>
                  {
                    newsArticle.description > 50
                      ? `{newsArticle.description.substring(0, 50)}...`
                      : newsArticle.description
                  }
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={newsArticle.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news image' />
                    <Text className='provider-name'>{newsArticle.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(newsArticle.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News
