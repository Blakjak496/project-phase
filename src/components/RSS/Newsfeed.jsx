import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid } from '@material-ui/data-grid';
import { formatDate } from '../../utils/utils';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const Parser = require('rss-parser');

let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

const parseFeed = async (url) => {
    let feed = await parser.parseURL(CORS_PROXY + url)
    return {
        title: feed.title,
        link: feed.link,
        items: feed.items
    }
}


const RSSReader = () => {
    const [parsedFeeds, setParsedFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedInput, setFeedInput] = useState('');
    const [numOfFeeds, setNumOfFeeds] = useState(1);
    const [currentTab, setCurrentTab] = useState('BBC News - Home');
    const [rssPage, setRssPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const { accountsRef } = useContext(UserContext);

    const urlsRef = accountsRef.collection('feeds');

    const [feedList, loading] = useCollection(urlsRef);

    const sortItems = (a, b) => b.numDate-a.numDate;

    const parseIt = async (url) => {
        const feed = await parseFeed(url);

        const pages = [];
        let page = [];
        
        const itemsWithNumDate = feed.items.map((item) => {
            const date = new Date(item.pubDate);
            const numDate = date.valueOf();
            const newItem = {...item, numDate};
            page.push(newItem);
            if (page.length === 6) {
                pages.push(page);
                page = [];
            }
            return newItem;
        });
        const sortedItems = itemsWithNumDate.sort(sortItems);
        const feedObj = {...feed, items: sortedItems, pages};
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
        if (parsedFeeds[0]) {
            setIsLoading(false);
            setCurrentTab(parsedFeeds[0].title);
            setNumOfPages(parsedFeeds[0].pages.length);
        }
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
                setFeedInput('');
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

    const handleTabClick = (event, count) => {
        setCurrentTab(event.currentTarget.id);
        setNumOfPages(count);
    }

    const handlePageChange = (event, page) => {
        setRssPage(page);
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#1d9b1a',
            },
            secondary: {
                main: '#f0f3df',
            }
        }
    })

    const activeFeed = () => {
        return parsedFeeds.find(item => {
            return item.title === currentTab;
        })
    }

    
        return (
            <div className="rss-reader">
                <div className="rss-reader--header">
                    <ThemeProvider theme={theme}>
                        <AppBar position="static" color="primary">
                            <Tabs value={false} variant="scrollable" scrollButtons="on" indicatorColor="secondary" >
                                {parsedFeeds.map((feed, index) => {
                                    return (
                                        <Tab key={index} id={feed.title} label={feed.title} onClick={(e) => {handleTabClick(e, feed.pages.length)}} />
                                    )
                                })}
                            </Tabs>
                        </AppBar>
                    </ThemeProvider>
                    <input className="rss-reader--input" value={feedInput} onChange={handleChange} type="text" placeholder="RSS Feed URL..." />
                    <button className="rss-reader--add" onClick={addFeedUrl}>Add</button>
                </div>
                {/* pages go here */}
                {isLoading ?
                <ThemeProvider theme={theme}>
                    <CircularProgress color={"primary"}/>
                </ThemeProvider>
                : <div className="rss-reader--articles">
                    <ThemeProvider theme={theme}>
                        <Pagination count={numOfPages} onChange={handlePageChange} showFirstButton color="primary"  />
                    </ThemeProvider>
                    
                            
                                <div className="rss-reader--page" >
                                        {activeFeed().pages[rssPage-1].map((article, index) => {
                                            return (
                                                <Card key={index} className="rss-card" >
                                                    <CardContent className="rss-card--content">
                                                        <h3 className="rss-card--title">{article.title} </h3>
                                                        <p className="rss-card--snippet">{article.contentSnippet} </p>
                                                        <p className="rss-card--date">{article.pubDate} </p>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                </div>
                            
                    
                </div>}
            </div>
        )
}

export default RSSReader;