import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import { parseFeed } from './parser';
import { useCollection } from 'react-firebase-hooks/firestore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid } from '@material-ui/data-grid';
import { formatDate } from '../../utils/utils';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const RSSReader = () => {
    const [parsedFeeds, setParsedFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedInput, setFeedInput] = useState('');
    const [numOfFeeds, setNumOfFeeds] = useState(1);
    const [currentTab, setCurrentTab] = useState('BBC News - Home');
    const { accountsRef } = useContext(UserContext);

    const urlsRef = accountsRef.collection('feeds');

    const [feedList, loading] = useCollection(urlsRef);

    const sortItems = (a, b) => b.numDate-a.numDate;

    const parseIt = async (url) => {
        
        const feed = await parseFeed(url);
        
        const itemsWithNumDate = feed.items.map(item => {
            const date = new Date(item.pubDate);
            const numDate = date.valueOf();
            const newItem = {...item, numDate};
            return newItem;
        });
        const sortedItems = itemsWithNumDate.sort(sortItems);
        const feedObj = {...feed, items: sortedItems};
        return await feedObj;
    }
    
    const parseThisList = async(urlList) => {
        
        let feedData = [];
        urlList.forEach((doc) => {                
            const feed = parseIt(doc.url);
            feedData.push(feed);
        })
        setParsedFeeds(await Promise.all(feedData));
    }
    
    useEffect(() => {
        if (parsedFeeds) setIsLoading(false);
    }, [parsedFeeds])
    
    useEffect(() => {
        
        if (!loading) {
            const docList = feedList.docs.map(doc => {
                const urlData = doc.data();
                return urlData;
            })
            setNumOfFeeds(docList.length)
            parseThisList(docList);
        }
        
    }, [feedList, loading])
    
    
    const addFeedUrl = (event) => {
        if (feedInput) {
            urlsRef.add({
                url: feedInput,
            })
            .then((res) => {
                console.log('feed added');
                event.target.value = '';
            })
            .catch((err) => {
                console.log('add feed error');
            })
            event.target.value = '';
        }
    }
    
    const handleChange = (event) => {
        setFeedInput(event.target.value);
    }

    
    const feedTitles = parsedFeeds.map(feed => {
        return feed.title;
    })

    const handleTabClick = (event) => {
        setCurrentTab(event.currentTarget.id);
    }
    
    const makeArticleCards = () => {
        
    }

    
    
        return (
            <div className="rss-reader">
                <div className="rss-reader--header">
                     <AppBar position="static">
                         <Tabs value={false} >
                             {parsedFeeds.map(feed => {
                                 return (
                                     <Tab id={feed.title} label={feed.title} onClick={handleTabClick} className="rss-tab" />
                                 )
                             })}
                         </Tabs>
                     </AppBar>
                    <input onChange={handleChange} type="text" placeholder="RSS Feed URL..." />
                    <button onClick={addFeedUrl}>Add</button>
                </div>
                <div className="rss-reader--articles">                   
                     
                    {parsedFeeds.map(feed => {
            if (feed.title === currentTab) {
                console.log(feed.title)
                return feed.items.map(article => {
                    console.log(Object.keys(article))
                    return (
                        <Card className="rss-card" >
                            <CardContent className="rss-card--content">
                                <h3 className="rss-card--title">{article.title} </h3>
                                <p className="rss-card--snippet">{article.contentSnippet} </p>
                                <p className="rss-card--date">{article.pubDate} </p>
                            </CardContent>
                        </Card>
                    )
                })
            }
        })} 
                    
                </div>
            </div>
        )
}

export default RSSReader;