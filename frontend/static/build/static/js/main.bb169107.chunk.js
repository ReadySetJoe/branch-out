(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{115:function(e,t,a){},116:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(16),l=a.n(i),o=(a(72),a(59)),r=a(5),c=a(25),m=a(26),u=a(30),h=a(27),d=a(7),g=a(29),f=a(12),p=a.n(f),v=a(11),b=a(60),_=a(13),y=a(61),E=a.n(y),N=(a(93),a(62)),k=a.n(N),w=(a(94),function(e){var t={backgroundImage:"url(".concat(e.item.album.images[0].url,")")},a={width:100*e.progress_ms/e.item.duration_ms+"%"};return s.a.createElement("div",{className:"App w-100"},s.a.createElement("div",{className:"main-wrapper"},s.a.createElement("div",{className:"now-playing__img"},s.a.createElement("img",{alt:"This should be the album art for the current playback",src:e.item.album.images[0].url})),s.a.createElement("div",{className:"now-playing__side"},s.a.createElement("div",{className:"now-playing__name"},e.item.name),s.a.createElement("div",{className:"now-playing__artist"},e.item.artists[0].name),s.a.createElement("div",{className:"now-playing__status"},e.is_playing?"Playing":"Paused"),s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:"progress__bar",style:a}))),s.a.createElement("div",{className:"background",style:t})," "))}),x=(a(95),a(24)),S=a(21),C=a(22),j=a(66),O=a(31),A=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=Object(r.a)(this.props.branches);t.forEach((function(e){e.limbs=[]}));for(var a=0;a<this.props.limbs.length;a++)for(var n=this.props.limbs[a],i=0;i<t.length;i++)n.branch.id===t[i].id&&t[i].limbs.push(n);return t=t.map((function(t,a){return s.a.createElement(C.a,{key:a,className:"m-2"},t.cover?s.a.createElement("div",{className:"branch-img",style:{backgroundImage:"url("+t.cover+")"}}):s.a.createElement(v.a,{icon:_.d,className:"default-branch-svg fa-7x"}),s.a.createElement(C.a.Body,null,s.a.createElement(C.a.Title,null,t.title)),s.a.createElement(C.a.Body,{className:"py-0"},s.a.createElement(j.a,{className:"list-group-flush"},t.limbs.map((function(t,a){return s.a.createElement(O.a,{key:a,className:"limb p-0 d-flex justify-content-between align-text-center"},s.a.createElement("div",{className:"text-left"},s.a.createElement("a",{href:t.song_url},t.artist_name)),s.a.createElement("div",{className:"text-right"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t.event_uri},t.venue_name)),s.a.createElement("button",{className:"btn-delete",onClick:function(){e.props.handleLimbDelete(t)}},"x"))})))),s.a.createElement(C.a.Body,null,s.a.createElement(x.a,null,"Export"),s.a.createElement(x.a,{onClick:function(){return e.props.handleBranchDelete(t)}},"Delete")))})),s.a.createElement(S.a,{className:"main",size:"lg",show:this.props.show,onHide:this.props.handleClose},s.a.createElement(S.a.Header,{closeButton:!0},s.a.createElement(S.a.Title,null,"".concat(this.props.first_name,"'s")," Branches")),s.a.createElement(S.a.Body,null,s.a.createElement("div",{className:"d-flex flex-wrap"},0!==t.length?t:s.a.createElement("h3",null,"No branches found!"))),s.a.createElement(S.a.Footer,null,s.a.createElement(x.a,{variant:"secondary",onClick:this.props.handleClose},"Close"),s.a.createElement(x.a,{variant:"primary",onClick:this.props.handleClose},"Save Changes")))}}]),t}(s.a.Component);a(115);p.a.defaults.xsrfCookieName="csrftoken",p.a.defaults.xsrfHeaderName="X-CSRFToken";var P=new k.a,L=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={token:null,first_name:"",uid:"",id:"",item:{album:{images:[{url:""}]},name:"",artists:[{name:"",id:""}],duration_ms:0},is_playing:"Paused",progress_ms:0,intervalID:0,root_artists:[],root_artists_selected:[],use_now_playing:!1,use_top_artists:!1,root_artists_selection_complete:!1,genre_set:new Set,navigator_has_geolocation:!1,geolocation_started:!1,geolocation_complete:!1,latitude:0,longitude:0,city:"",region:"",country_code:"",artists_all:[],artists:[],events_all:[],events_artists:[],events:[],matches:[],limbs:[],branch_name:"",branch:[],preview:"",image:null,playlist_id:"",limbs_user:[],branches_user:[],show_modal:!1},a.myRef=s.a.createRef(),a.getNowPlaying=a.getNowPlaying.bind(Object(d.a)(a)),a.useTopArtists=a.useTopArtists.bind(Object(d.a)(a)),a.useNowPlaying=a.useNowPlaying.bind(Object(d.a)(a)),a.selectArtist=a.selectArtist.bind(Object(d.a)(a)),a.useMyLocation=a.useMyLocation.bind(Object(d.a)(a)),a.findEvents=a.findEvents.bind(Object(d.a)(a)),a.handleImageChange=a.handleImageChange.bind(Object(d.a)(a)),a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.makeLimbs=a.makeLimbs.bind(Object(d.a)(a)),a.makeBranch=a.makeBranch.bind(Object(d.a)(a)),a.handleLimbDelete=a.handleLimbDelete.bind(Object(d.a)(a)),a.handleBranchDelete=a.handleBranchDelete.bind(Object(d.a)(a)),a.exportPlaylist=a.exportPlaylist.bind(Object(d.a)(a)),a.save=a.save.bind(Object(d.a)(a)),a.load=a.load.bind(Object(d.a)(a)),a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=["accessible","accomplished","ambitious","assured","bangin","beautiful","blissful","bold","breathtaking","brilliant","catchy","cerebral","classic","clean","clever","cleverly-written","cohesive","complex","conceptual","danceable","definitive","deftly-produced","delightful","dynamic","ebullient","eclectic","ecstatic","effortless","emotionally-rich","endlessly-playable","enigmatic","enterntaining","epic","ethereal","exceptional","exhilarating","expansive","notable","nuanced","number","operatic","passionate","percussion-saoked","perfect","piercing","playful","poetic","poignant","polished","primal","progressive","radical","raw","refined","refrain","relentless","reliably-solid","reverbed","rhythimic","riotous","riveting","rollicking","satisfying","saturated","sculptural","seductive","sensitive","skilled","skillful","soaring","solid","sombre","sonic","sophisticated","feel-good","finely-calibrated","flawless","fluid","focused","fresh","funky","grandiose","groundbreaking","harmonic","harmonically-rich","headbanging","heartfelt","hi-fi","highly-listenable","highly-recommended","hypnotic","indulgent","innocent","instrospective","instrumental","intoxicating","inventice","invigorating","inviting","latest","layered","limitless","listenable","lush","lyrical","masterful","mesmerizing","midtempo","moody","musical","mythical","sprawling","staccato","stratospheric","strident","striking","studied","stunning","stylish","stylistic","sublime","successful","surprising","symphonic","synthetic","talented","tender","textured","thrilling","throbbing","thunderous","tight","timeless","top-flight","trademark","trailblazing","transcendent","transporting","unexpected","unfied","unique","unpredictable","unsung","upbeat","visionary","vocal","well-rounded","well-tooled"],a=["Alder","Apple","Ash","Aspen","Basswood","Birch","Buckeye","Buckthorn","California-laurel","Catalpa","Cedar","Cherry","Chestnut","Chinkapin","Cottonwood","Cypress","Dogwood","Douglas-fir","Elm","Filbert","Fir","Giant","Hawthorn","Hazel","Hemlock","Holly","Honeylocust","Horsechestnut","Incense-cedar","Juniper","Larch","Locust","Madrone","Maple","Mountain-ash","Mountain-mahogany","Oak","Oregon-myrtle","Pear","Pine","Plum","Poplar","Redcedar/Arborvitae","Redwood","Russian-olive","Spruce","Sweetgum","Sycamore","Tanoak","Walnut","White-cedar","Willow","Yellow-poplar","Yew"],n=t[Math.floor(Math.random()*t.length)],s=t[Math.floor(Math.random()*t.length)],i=a[Math.floor(Math.random()*a.length)];this.setState({branch_name:"".concat(n.toLowerCase(),"-").concat(s.toLowerCase(),"-").concat(i.toLowerCase())}),this.setState({navigator_has_geolocation:"geolocation"in navigator}),p.a.get("http://ip-api.com/json").then((function(t){console.log("IP lookup",t),e.setState({latitude:t.data.lat,longitude:t.data.lon,city:t.data.city,region:t.data.region,country_code:t.data.countryCode}),e.findEvents()})).catch((function(e){return console.log(e)})),this.state.token?this.getNowPlaying():p.a.get("/api/v1/user-social-auth/").then((function(t){console.log("Check for login:",t),P.setAccessToken(t.data[0].extra_data.access_token),e.getNowPlaying(),e.setState({token:t.data[0].extra_data.access_token,first_name:t.data[0].user.first_name,uid:t.data[0].uid,id:t.data[0].id}),p.a.get("/api/v1/branches/").then((function(t){console.log("User Branches:",t),e.setState({branches_user:t.data})})).catch((function(e){return console.log(e)})),p.a.get("/api/v1/limbs/").then((function(t){console.log("User Limbs:",t),e.setState({limbs_user:t.data})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.intervalID)}},{key:"getNowPlaying",value:function(){var e=this;P.getMyCurrentPlaybackState().then((function(t){t&&e.setState({item:t.item,is_playing:t.is_playing,progress_ms:t.progress_ms})})).catch((function(t){console.log(t),e.setState({item:{album:{images:[{url:""}]},name:"",artists:[{name:"",id:""}],duration_ms:0},is_playing:"Spotify Not Currently in use",progress_ms:0})}))}},{key:"useNowPlaying",value:function(){var e=this;P.getArtistRelatedArtists(this.state.item.artists[0].id).then((function(t){console.log("Artists Related to Now Playing:",t);var a=t.artists;P.getArtist(e.state.item.artists[0].id).then((function(t){console.log("Also, Now Playing Artist:",t),a.unshift(t),e.setState({root_artists:a,use_now_playing:!0,use_top_artists:!1,genre_set:new Set})})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}},{key:"useTopArtists",value:function(){var e=this;P.getMyTopArtists().then((function(t){console.log("Top Artists: ",t),e.setState({root_artists:t.items,use_top_artists:!0,use_now_playing:!1,genre_set:new Set})})).catch((function(e){console.log(e)}))}},{key:"selectArtist",value:function(e){if(this.state.root_artists_selected.includes(e)){var t=Object(r.a)(this.state.root_artists_selected);t.splice(t.indexOf(e),1),this.setState({root_artists_selected:t})}else{var a=Object(r.a)(this.state.root_artists_selected);a.push(e),this.setState({root_artists_selected:a})}}},{key:"findArtists",value:function(){for(var e=this,t=[],a=0;a<this.state.root_artists_selected.length;a++)t.push(this.state.root_artists_selected[a].id);P.getArtists(t).then((function(t){console.log("Selected Artist:",t);var a=Object(r.a)(e.state.artists_all);a=a.concat(t.artists);var n=t.artists.map((function(e){return e.genres})).values();n=new Set(Array.from(n).flat());var s=new Set([].concat(Object(r.a)(e.state.genre_set),Object(r.a)(n)));e.setState({artists_all:a,genre_set:s})}));for(var n=function(t){P.getArtistRelatedArtists(e.state.root_artists_selected[t].id).then((function(t){console.log("Related to Selected Artist:",t);var a=Object(r.a)(e.state.artists_all);a=a.concat(t.artists);var n=t.artists.map((function(e){return e.genres})).values();n=new Set(Array.from(n).flat());var s=new Set([].concat(Object(r.a)(e.state.genre_set),Object(r.a)(n)));e.setState({artists_all:a,genre_set:s})})).catch((function(e){console.log(e)})).finally((function(){t===e.state.root_artists_selected.length-1&&(console.log("# of artists found: ".concat(e.state.artists_all.length)),console.log("# of genres found: ",e.state.genre_set.size),console.log("genres found: ",e.state.genre_set))}))},s=0;s<this.state.root_artists_selected.length;s++)n(s)}},{key:"useMyLocation",value:function(e){e.preventDefault(),this.setState({geolocation_started:!0});var t=this;navigator.geolocation.getCurrentPosition((function(e){t.setState({latitude:e.coords.latitude,longitude:e.coords.longitude,geolocation_complete:!0,events_all:[]}),t.findEvents()}),(function(e){console.error("An error has occured while retrieving location",e)}))}},{key:"findEvents",value:function(){var e=this;p()({method:"get",url:"https://api.songkick.com/api/3.0/events.json?apikey=".concat("io09K9l3ebJxmxe2","&location=geo:").concat(this.state.latitude,",").concat(this.state.longitude,"&page=1")}).then((function(t){var a;e.setState({events_all:t.data.resultsPage.results.event});var n=Object(r.a)(e.state.events_artists);for(a=0;a<e.state.events_all.length;a++){var s=e.state.events_all[a],i=void 0;for(i=0;i<s.performance.length;i++)n.push(s.performance[i].artist)}e.setState({events_artists:n}),t.data.resultsPage.totalEntries>t.data.resultsPage.results.event.length&!0&&function(){var a=t.data.resultsPage.totalEntries,n=t.data.resultsPage.perPage;console.log("There are ".concat(a," results and ").concat(n," on each page")),console.log("Which means the site needs to make ".concat(Math.ceil(a/n)," calls total")),console.log("and the last call should have ".concat(a%n," entries"));for(var s=Math.ceil(a/n),i=function(t){p()({method:"get",url:"https://api.songkick.com/api/3.0/events.json?apikey=".concat("io09K9l3ebJxmxe2","&location=geo:").concat(e.state.latitude,",").concat(e.state.longitude,"&page=").concat(t+1)}).then((function(t){var a=Object(r.a)(e.state.events_all);a=a.concat(t.data.resultsPage.results.event),e.setState({events_all:a});for(var n=Object(r.a)(e.state.events_artists),s=0;s<e.state.events_all.length;s++)for(var i=e.state.events_all[s],l=0;l<i.performance.length;l++)n.includes(i.performance[l].artist)||n.push(i.performance[l].artist);e.setState({events_artists:n})})).catch((function(e){return console.log(e)})).finally((function(){t===s-1&&(console.log("Events Found:",e.state.events_all),console.log("Performing Artists Found:",e.state.events_artists))}))},l=1;l<s;l++)i(l)}()})).catch((function(e){console.log(e)})).finally((function(){0}))}},{key:"makeLimbs",value:function(){var e=this;this.setState({limbs:[]});for(var t=Object(r.a)(this.state.events_all),a=Object(r.a)(this.state.artists_all),n=[],s=function(s){for(var i=a[s],l=function(a){for(var s=t[a],l=0;l<s.performance.length;l++){var o=s.performance[l];i.name!==o.artist.displayName||n.includes(i.name)||(n.push(i.name),P.getArtistTopTracks(i.id,"ES").then((function(t){var a=Object(r.a)(e.state.limbs),n={artist:i,song:t.tracks[0],event:s};a.includes(n)||(a.push(n),e.setState({limbs:a}))})).catch((function(e){return console.log(e)})))}},o=0;o<t.length;o++)l(o)},i=0;i<a.length;i++)s(i)}},{key:"makeBranch",value:function(e){e.preventDefault();var t=Object(r.a)(this.state.branches_user);t.push({cover:this.state.preview,title:this.state.branch_name,limbs:this.state.branch}),this.setState({branches_user:t});var a=new FormData;a.append("title",this.state.branch_name),this.state.image&&a.append("cover",this.state.image);for(var n=[],s=0;s<this.state.limbs.length;s++){var i={artist_url:this.state.limbs[s].artist.uri,artist_id:this.state.limbs[s].artist.id,artist_name:this.state.limbs[s].artist.name,event_id:this.state.limbs[s].event.id,event_uri:this.state.limbs[s].event.uri,event_name:this.state.limbs[s].event.displayName,event_city:this.state.limbs[s].event.location.city,event_date:this.state.limbs[s].event.start.date,venue_name:this.state.limbs[s].event.venue.displayName,venue_id:this.state.limbs[s].event.venue.id,venue_url:this.state.limbs[s].event.venue.uri,song_url:this.state.limbs[s].song.uri,song_name:this.state.limbs[s].song.name,song_preview_url:this.state.limbs[s].song.preview_url};n.push(i)}n=JSON.stringify(n),a.append("limbs",n),p()({method:"post",url:"/api/v1/branch/",data:a,config:{headers:{"Content-Type":"multipart/form-data"}}}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}},{key:"handleBranchDelete",value:function(e){var t=this;p.a.delete("/api/v1/branch/".concat(e.id,"/")).then((function(a){var n=Object(r.a)(t.state.branches_user),s=n.indexOf(e);n.splice(s,1),t.setState({branches_user:n})})).catch((function(e){console.log(e)}))}},{key:"handleLimbDelete",value:function(e){var t=Object(r.a)(this.state.limbs),a=t.indexOf(e);t.splice(a,1),this.setState({limbs:t}),p.a.delete("/api/v1/limb/".concat(e.id,"/")).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},{key:"exportPlaylist",value:function(){for(var e=this,t=this.state.uid,a=this.state.branch_name,n=[],s=0;s<this.state.limbs.length;s++)n.push(this.state.limbs[s].song.uri);P.createPlaylist(t,{name:a,description:"a playlist of upcoming events generated by branch.out"}).then((function(t){console.log("Create Playlist Response:",t),e.setState({playlist_id:t.id}),P.addTracksToPlaylist(t.id,n).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}},{key:"handleChange",value:function(e){this.setState(Object(o.a)({},e.target.name,e.target.value))}},{key:"handleImageChange",value:function(e){var t=this,a=e.target.files[0];this.setState({image:a});var n=new FileReader;n.onloadend=function(){t.setState({preview:n.result})},n.readAsDataURL(a)}},{key:"save",value:function(){var e={};e.token=this.state.token,e.artists=this.state.artists,e.artists_all=this.state.artists_all,e.events=this.state.events,e.events_all=this.state.events_all,e.events_artists=this.state.events_artists,e.is_playing=this.state.is_playing,e.item=this.state.item,e.latitude=this.state.latitude,e.limbs=this.state.limbs,e.longitude=this.state.longitude,e.matches=this.state.matches,e.progress_ms=this.state.progress_ms,e.root_artists=this.state.root_artists,e.root_artists_selected=this.state.root_artists_selected,e.root_artists_selection_complete=this.state.root_artists_selection_complete,e.use_latlong=this.state.use_latlong,e.use_now_playing=this.state.use_now_playing,e.use_top_artists=this.state.use_top_artists,e.use_zipcode=this.state.use_zipcode,e.first_name=this.state.first_name,e.zipcode=this.state.zipcode,e.uid=this.state.uid,e.id=this.state.id,e.show_modal=this.state.show_modal,e.genre_set=this.state.genre_set,localStorage.setItem("state",JSON.stringify(e)),console.log("State Saved!"),console.log(e)}},{key:"load",value:function(){var e=JSON.parse(localStorage.getItem("state"));this.setState(e),console.log("State Loaded!"),console.log(e)}},{key:"render",value:function(){var e=this,t=this.state.root_artists.map((function(t,a){return s.a.createElement("button",{key:a,className:"btn root-artist-btn ".concat(e.state.root_artists_selected.includes(t)?"btn-selected":""),onClick:function(){return e.selectArtist(t)}},s.a.createElement("img",{className:"root-artist-img",src:t.images[0].url,alt:"profile for ".concat(t.name)}),t.name)})),a=this.state.limbs.map((function(t,a){return s.a.createElement("div",{key:a,className:"limb d-flex align-text-center"},s.a.createElement("div",null,a+1),s.a.createElement("div",{className:"col-3 text-left"},s.a.createElement("a",{href:t.artist.uri},t.artist.name)),s.a.createElement("div",{className:"col-3 text-left"},s.a.createElement("a",{href:t.song.uri},t.song.name)),s.a.createElement("div",{className:"col-2"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t.event.venue.uri},t.event.venue.displayName)),s.a.createElement("div",{className:"col-1"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t.event.uri},"get tix")),s.a.createElement("div",{className:"col-2"},t.event.location.city.replace(", US","")),s.a.createElement("div",null,t.event.start.date.slice(5,t.event.start.date.length)),s.a.createElement("button",{className:"btn-delete",onClick:function(){return e.handleLimbDelete(t)}},"x"))})),n=s.a.createElement("div",{className:"limbs"},s.a.createElement("div",{className:"limb font-weight-bolder"},s.a.createElement("div",null,"#"),s.a.createElement("div",{className:"col-3 text-left"},"Artist"),s.a.createElement("div",{className:"col-3 text-left"},"Top Song"),s.a.createElement("div",{className:"col-2"},"Venue"),s.a.createElement("div",{className:"col-1"},"Tickets"),s.a.createElement("div",{className:"col-2"},"City"),s.a.createElement("div",null,"Date")),a);return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement("div",{style:{position:"fixed",bottom:60,right:5}},s.a.createElement("button",{className:"btn",onClick:function(){return e.save()}},"save"),s.a.createElement("button",{className:"btn",onClick:function(){return e.load()}},"load")),s.a.createElement(A,{show:this.state.show_modal,branches:this.state.branches_user,limbs:this.state.limbs_user,handleClose:function(){return e.setState({show_modal:!1})},handleBranchDelete:this.handleBranchDelete,handleLimbDelete:this.handleLimbDelete,first_name:this.state.first_name}),s.a.createElement("h1",{className:"".concat(this.state.token?"title":"title title-login animate fadeInUp one")},"branch.out"),!this.state.token&&s.a.createElement("div",{className:"d-flex flex-column align-items-center animate fadeInUp two"},s.a.createElement(v.a,{className:"my-2",icon:_.d}),s.a.createElement("h3",{className:"my-2"},"Welcome to branch.out"),s.a.createElement("h3",{className:"my-2"},"A site that helps people find new music, coming to a nearby stage"),s.a.createElement("h3",{className:"my-2"},"Let's find the the next concert you will never forget"),s.a.createElement(v.a,{className:"my-2",icon:_.d}),s.a.createElement("a",{className:"btn btn-login animate fadeInUp three my-3",href:"/social/login/spotify/"},"Login to Spotify")),s.a.createElement("nav",{className:"scrollspy-placeholder fixed-left"},s.a.createElement("ul",null)),this.state.token&&s.a.createElement("div",null,s.a.createElement("div",{className:"top-bar fixed-top d-flex align-items-center justify-content-between p-2"},s.a.createElement("h4",{className:""},"Hey, ",this.state.first_name),s.a.createElement("div",{className:"top-right-btns"},s.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:function(){return e.setState({show_modal:!0})}},"My Branches (",this.state.branches_user.length,")"),s.a.createElement("a",{href:"/accounts/logout/",className:"btn-logout btn m-2"},"Logout")))),s.a.createElement("footer",{className:"bottom-bar fixed-bottom d-flex align-items-center justify-content-between p-2"},s.a.createElement("div",{className:"ccs-thank-you mr-5 text-left"},"Created at ",s.a.createElement("a",{href:"https://carolinacodeschool.org/"},"Carolina Code School"),s.a.createElement("br",null),"Presented Nov, 15th 2019"),s.a.createElement("div",{className:"created-by"},"branch.out was made by Joe Powers, more of my stuff here:",s.a.createElement("a",{className:"mx-1",href:"https://github.com/ReadySetJoe"},s.a.createElement(v.a,{icon:_.b})),s.a.createElement("a",{className:"mx-1",href:"https://www.linkedin.com/in/joe-powers/"},s.a.createElement(v.a,{icon:_.c}))),s.a.createElement("div",{className:"citations ml-5 d-flex flex-row align-items-center"},s.a.createElement("span",null,"API:"),s.a.createElement("div",{className:"citations-api text-left mx-2"},s.a.createElement("div",{className:"citation-spotify"},s.a.createElement("a",{href:"https://developer.spotify.com/"},"Spotify ",s.a.createElement(v.a,{icon:_.e}))),s.a.createElement("div",{className:"citation-songkick"},s.a.createElement("a",{href:"https://www.songkick.com/developer"},"Songkick ",s.a.createElement("img",{className:"songkick-badge-img",alt:"songkick badge",src:E.a})))),"Style:",s.a.createElement("div",{className:"citations-style text-left mx-2"},s.a.createElement("div",{className:"citation-fontawesome"},s.a.createElement("a",{href:"https://fontawesome.com/"},"Font Awesome ",s.a.createElement(v.a,{icon:_.a}))),s.a.createElement("div",{className:"citation-style"},s.a.createElement("a",{href:"https://github.com/JoeKarlsson/react-spotify-player"},"Joe Karlssons ",s.a.createElement(v.a,{icon:_.b})))))),this.state.token&&s.a.createElement("div",{className:"w-100"},s.a.createElement("section",{className:"player-wrapper justify-content-center"},this.state.item.album.images[0].url?s.a.createElement(w,{item:this.state.item,is_playing:this.state.is_playing,progress_ms:this.state.progress_ms}):s.a.createElement("div",null,s.a.createElement("h3",null,"Let's get started."),s.a.createElement("div",null,"To make sure your Spotify is connected, play a song (on your phone, or any device)")),s.a.createElement("button",{className:"btn p-1 refresh-btn",onClick:function(){return e.getNowPlaying()}},s.a.createElement("span",{className:"p-1"},s.a.createElement(v.a,{icon:b.a})))),s.a.createElement("button",{className:"btn ".concat(this.state.use_now_playing?"btn-selected":""," "),onClick:function(){return e.useNowPlaying()}},"Use Artists Related to Now Playing"),s.a.createElement("button",{className:"btn ".concat(this.state.use_top_artists?"btn-selected":""," "),onClick:function(){return e.useTopArtists()}},"Use Your Top Artists")),s.a.createElement("section",{className:"".concat(this.state.use_now_playing||this.state.use_top_artists?"animate fadeInRight d-flex flex-column align-items-center":"d-none"," ")},s.a.createElement("h2",{className:"animate fade-in-right my-4 align-self-baseline "},"Please select at least 3 root artists to continue:"),s.a.createElement("div",{className:"d-flex align-items-center"},s.a.createElement("div",null,s.a.createElement("button",{className:"btn",onClick:function(){return e.setState({root_artists_selected:e.state.root_artists})}},"All"),s.a.createElement("button",{className:"btn",onClick:function(){return e.setState({root_artists_selected:[]})}},"None")),s.a.createElement("div",null,t)),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){e.state.root_artists_selected.length>=3&&(e.setState({root_artists_selection_complete:!0}),e.findArtists())},className:"mt-5 \n                ".concat(this.state.root_artists_selected.length>=3?"btn":"btn btn-disabled"," \n                ").concat(this.state.root_artists_selection_complete?"btn-selected":"","\n                ")},"Continue Using These Artists"))),this.state.root_artists_selection_complete&&s.a.createElement("section",{className:"location d-flex justify-content-center animate fadeInLeft"},s.a.createElement("div",{className:"location-ip p-3 m-4 ".concat(""!==this.state.city?"":"d-none")},s.a.createElement("h3",{className:""},"Based on your IP address, your location is:"),s.a.createElement("h2",null,s.a.createElement("i",null,"".concat(this.state.city,", ").concat(this.state.region,", ").concat(this.state.country_code)))),s.a.createElement("div",{className:"location-geo m-4 ".concat(this.state.navigator_has_geolocation?"d-flex flex-column":"d-none")},s.a.createElement("h4",null,"Not your location? Click below for a better guess:"),this.state.geolocation_complete?s.a.createElement("button",{className:"btn m-auto btn-selected"},"Found!"):s.a.createElement("button",{className:"btn m-auto",onClick:this.useMyLocation},"Find My Location"),this.state.geolocation_started&&!this.state.geolocation_complete&&s.a.createElement("div",{className:"loader"})),s.a.createElement("div",{className:"location-zip m-4 ".concat(this.state.navigator_has_geolocation?"d-none":"d-flex")},s.a.createElement("div",null,"We're sorry, your browser doesn't support geolocation :("),s.a.createElement("div",null,"Location by US zipcode is still currently in development"))),s.a.createElement("div",{className:" ".concat(this.state.root_artists_selection_complete&&0!==this.state.latitude?"d-flex flex-column":"d-none")},"Let's do the thing",s.a.createElement("button",{className:"btn",onClick:function(){return e.makeLimbs()}},"Begin"),s.a.createElement("div",null,"# of events found: ",this.state.events_all.length),s.a.createElement("div",null,"# of performing artists found: ",this.state.events_artists.length),s.a.createElement("div",null,"# of related artists found: ",this.state.artists_all.length),s.a.createElement("div",null,"# of genres found: ",this.state.genre_set.size)),this.state.limbs.length>0&&s.a.createElement("section",{className:"animate fadeInUp"},s.a.createElement("header",null,s.a.createElement("form",{onSubmit:this.makeBranch,className:"new-branch-form m-2 d-flex flex-row align-items-center justify-content-around"},s.a.createElement("button",{type:"button",icon:"file",onClick:function(){return e.myRef.current.click()},className:"btn branch-img-preview-btn"},this.state.image?s.a.createElement("img",{className:"branch-img-preview",src:this.state.preview,alt:"branch cover preview",width:"200"}):s.a.createElement("div",null,s.a.createElement(v.a,{icon:_.d,className:"fa-7x"}),s.a.createElement("br",null),s.a.createElement("p",null,"cover image upload"))),s.a.createElement("input",{className:"d-none",ref:this.myRef,type:"file",name:"image",onChange:this.handleImageChange}),s.a.createElement("div",{className:"text-left"},s.a.createElement("h3",null,"Here's your new branch, let's give it a name:"),s.a.createElement("input",{className:"branch-name-input",name:"branch_name",value:this.state.branch_name,onChange:this.handleChange,type:"text"})),s.a.createElement("div",null,s.a.createElement("button",{className:"btn",type:"submit",value:"save"},"Add to My Branches"),s.a.createElement("button",{className:"btn",type:"button",onClick:this.exportPlaylist},"Export to playlist")))),n)))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},61:function(e,t,a){e.exports=a.p+"static/media/sk-badge-pink.0683350a.svg"},67:function(e,t,a){e.exports=a(116)},72:function(e,t,a){},93:function(e,t,a){e.exports=a.p+"static/media/powered-by-songkick-pink.21353628.svg"},94:function(e,t,a){},95:function(e,t,a){}},[[67,1,2]]]);
//# sourceMappingURL=main.bb169107.chunk.js.map