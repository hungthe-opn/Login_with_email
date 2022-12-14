import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { Card } from 'antd';
import { Spin, Space } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import parse from 'html-react-parser';
import Comments from '../components/Comments';


export default class ArticleDetails extends Component {

    state = {
        article: null
    }

    componentDidMount() {
        // Prism.highlightAll();
        const slug = this.props.match.params.slug;


        Axios.get(`http://127.0.0.1:8000/api/post/${slug}/`)
            .then((res) => {
                // console.log(res.data.data);
                const data = {}
                res.data.data.map((item) => (
                    data.article_title = item.article_title,
                    data.article_description = item.article_description,
                    data.article_image = item.article_image,
                    data.article_id = item.article_id,
                    data.author = item.author,
                    data.created_at = item.created_at
                ))
                let a = data.created_at
                let date_time = a.split("T")

                let date = date_time[0].split("-")
                let year = date[0]
                let month = date[1]
                let day = date[2]

                date = `${day}-${month}-${year}`
                var H = +date_time[1].substr(0, 2);
                var h = H % 12 || 12;
                var ampm = (H < 12 || H === 24) ? "AM" : "PM";
                var timeString = h + date_time[1].substr(2, 3) + ampm;

                data.date = date
                data.time = timeString

                this.setState({
                    article: data
                })
            })
    }

    render() {
        // console.log("this.state.article");
        // console.log( this.state.article);
        const token = localStorage.getItem("token")
        if (this.state.article === null) {
            return (
                <div className="example">
                    <Spin size="large" />
                </div>
            )
        } else {
            // const bg = "http://127.0.0.1:8000/media/" + this.state.article.article_image
            const html = this.state.article.article_description;
            return (
                <>
                    <img src={"http://127.0.0.1:8000/media/" + this.state.article.article_image} class="img-fluid my-4 mx-auto d-block" alt="cover"></img>
                    <hr class="my-4" />
                    <div class="blog-post my-4 container">
                        <h2 class="blog-post-title">{this.state.article.article_title}</h2>
                        <p class="blog-post-meta">Published On <strong>{this.state.article.date}</strong> at <strong>{this.state.article.time}</strong> by <strong><a href="#">{this.state.article.author}</a></strong></p>

                        <hr />
                        {/* <p>{this.state.article.article_description}</p> */}
                        <div className="container">
                            {ReactHtmlParser(html)}
                            <hr />
                        </div>
                        <div className="container">
                        {
                            token !== null ?
                            <Comments />
                            :
                            <div>
                                <h3>You Need to Sign in for Comment</h3>
                                <Link to="/signin" class="btn btn-outline-success m-2">Sign In</Link>
                            </div>
                        }
                        
                        </div>
                    </div>

                    
                </>
            )
        }
    }
}



// <div className="site-card-border-less-wrapper">
// {/* <React.Fragment>
//     <Card
//         // hoverable
//         // style={{ width: 240 }}
//         cover={<img alt="example" src={"http://127.0.0.1:8000/media/" + this.state.article.article_image} width={500} height={450} />}
//     >
//         <Meta title={this.state.article.article_title} description={this.state.article.article_description} />
//     </Card>
//     {/* <h1><Link to={`/post/update/${this.state.article.article_id}`}>Update Post</Link></h1> */}
//     <CustomForm articleId={this.state.article.article_id} method="PUT" buttonType="Update" />
// </React.Fragment>


//     // Page Header 
//     <header class="masthead" style="background-image: url('img/post-bg.jpg')">
//         <div class="overlay"></div>
//         <div class="container">
//             <div class="row">
//                 <div class="col-lg-8 col-md-10 mx-auto">
//                     <div class="post-heading">
//                         <h1>Man must explore, and this is exploration at its greatest</h1>
//                         <h2 class="subheading">Problems look mighty small from 150 miles up</h2>
//                         <span class="meta">Posted by
//           <a href="#">Start Bootstrap</a>
//           on August 24, 2019</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </header>

//     //    Post Content 
//     <article>
//         <div class="container">
//             <div class="row">
//                 <div class="col-lg-8 col-md-10 mx-auto">
//                     <p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center ??? an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>

//                     <p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>

//                     <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>

//                     <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>

//                     <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>

//                     <h2 class="section-heading">The Final Frontier</h2>

//                     <p>There can be no thought of finishing for ???aiming for the stars.??? Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>

//                     <p>There can be no thought of finishing for ???aiming for the stars.??? Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>

//                     <blockquote class="blockquote">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>

//                     <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>

//                     <h2 class="section-heading">Reaching for the Stars</h2>

//                     <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>

//                     <a href="#">
//                         <img class="img-fluid" src="img/post-sample-image.jpg" alt="">
//           </a>
//                         <span class="caption text-muted">To go places and do things that have never been done before ??? that???s what living is all about.</span>

//                         <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>

//                         <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there???s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>

//                         <p>Placeholder text by
//             <a href="http://spaceipsum.com/">Space Ipsum</a>. Photographs by
//             <a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>.</p>
//         </div>
//                 </div>
//             </div>
//   </article> */}
