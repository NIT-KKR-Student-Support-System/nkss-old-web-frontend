import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style/announcement.css'
import AnnouncementNotoCard from './AnnouncementNotoCard'

function Announcements() {
    const iniNoto = [
        {
            'name': '',
            'link': '',
            'tags': ''
        }
    ];
    const [Noto, setNoto] = useState(iniNoto);
    const [branch, setBranch] = useState("All Branches");
    const [degree, setDegree] = useState("All Courses");

    useEffect(() => {
        try {
            const fetchNoto = async () => {
                const data = await axios.get('https://NKSS-backend-production-0380.up.railway.app/announcements');
                // console.log('Data: ', data.data);
                setNoto(data.data);
            }
            fetchNoto();
        } catch (error) {
            console.log('Error: ', error)
        }
    }, [])

    useEffect(() => {
        try {
            const fetchNoto = async () => {
                let data = await axios.get('https://NKSS-backend-production-0380.up.railway.app/announcements');
                // console.log('data: ', data.data.filter((e)=> e.tags != null && e.tags.includes("B.Tech.")));
                if (branch == "All Branches" && degree == "All Courses") {
                    setNoto(data.data);
                    // console.log(1, data);
                }
                else if (branch == "All Branches" && degree != "All Courses") {
                    data = data.data.filter((e) => e.tags != null && e.tags.includes(degree));
                    setNoto(data);
                    // console.log(2, data);

                }
                else if (branch != "All Branches" && degree == "All Courses") {
                    data = data.data.filter((e) => e.tags != null && e.tags.includes(branch));
                    setNoto(data);
                    // console.log(3, data);

                }
                else if (branch != "All Branches" && degree != "All Courses") {
                    data = data.data.filter((e) => e.tags != null);
                    data = data.data.filter((e) => e.tags.includes(degree) && e.tags.includes(branch))
                    setNoto(data);
                    // console.log(4, data);
                }
            }
            fetchNoto();
        } catch (error) {
            console.log('Error: ', error)
        }
    }, [branch, degree])

    return (
        <div className="announcementCont container-fluid">
            <div className="header container">
                <h1>Announcements</h1>
                <p>Stay updated with latest college announcement. Filter unwanted announcements as per your discipline.</p>
            </div>
            <div className="container partition">
            </div>
            <div className="filters container">
                <select onChange={(e) => setBranch(e.target.value)} name="branch" id="branch" defaultValue={"All Branches"}>
                    <option value="All Branches">All Branches</option>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="EC">ECE</option>
                    <option value="EE">EE</option>
                    <option value="ME">ME</option>
                    <option value="PI">PIE</option>
                    <option value="CE">Civil</option>
                </select>
                <select onChange={(e) => setDegree(e.target.value)} name="degree" id="degree" defaultValue={"All Courses"}>
                    <option value="All Courses">All Courses</option>
                    <option value="B.Tech.">B.Tech</option>
                    <option value="M.Tech.">M.Tech</option>
                    <option value="MCA">MCA</option>
                </select>
            </div>
            <div className="notificationCont container">
                <div className="row">
                    {Noto.map((e) => {
                        return (
                            <>
                                {e.name == '' ? '' :
                                    <AnnouncementNotoCard desc={e.name} link={`${e.link}`} className='col-1' />}
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Announcements