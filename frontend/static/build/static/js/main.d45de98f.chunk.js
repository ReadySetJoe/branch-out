(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{62:function(e,t,s){},84:function(e,t,s){},86:function(e,t,s){},87:function(e,t,s){},88:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s.n(a),i=s(20),l=s.n(i),c=(s(62),s(54)),o=s(6),r=s(29),d=s(30),h=s(9),u=s(37),m=s(36),b=s(12),g=s.n(b),j=s(13),f=(s(56),s(16)),p=s(43),v=s.p+"static/media/sk-badge-white.a33d170e.svg",_=s(55),x=s.n(_),y=(s(84),s(1)),O=function(e){var t={backgroundImage:"url(".concat(e.item.album.images[0].url,")")},s={width:100*e.progress_ms/e.item.duration_ms+"%"};return Object(y.jsx)("div",{className:"App w-100",children:Object(y.jsxs)("div",{className:"main-wrapper",children:[Object(y.jsx)("div",{className:"now-playing__img",children:Object(y.jsx)("img",{alt:"This should be the album art for the current playback",src:e.item.album.images[0].url})}),Object(y.jsxs)("div",{className:"now-playing__side",children:[Object(y.jsx)("div",{className:"now-playing__name",children:e.item.name}),Object(y.jsx)("div",{className:"now-playing__artist",children:e.item.artists[0].name}),Object(y.jsx)("div",{className:"now-playing__status",children:e.is_playing?"Playing":"Paused"}),Object(y.jsx)("div",{className:"progress",children:Object(y.jsx)("div",{className:"progress__bar",style:s})})]}),Object(y.jsx)("div",{className:"background",style:t})," "]})})},w=(s(86),s(42)),N=s(24),k=s(28),S=s(57),C=s(26),A=function(e){Object(u.a)(s,e);var t=Object(m.a)(s);function s(){return Object(r.a)(this,s),t.apply(this,arguments)}return Object(d.a)(s,[{key:"render",value:function(){var e=this,t=Object(o.a)(this.props.branches);t.forEach((function(e){e.limbs=[]}));for(var s=0;s<this.props.limbs.length;s++)for(var a=this.props.limbs[s],n=0;n<t.length;n++)a.branch.id===t[n].id&&t[n].limbs.push(a);return t=t.map((function(t,s){return Object(y.jsxs)(k.a,{className:"m-2",children:[t.cover?Object(y.jsx)("div",{className:"branch-img",style:{backgroundImage:"url("+t.cover+")"}}):Object(y.jsx)(j.a,{icon:f.d,className:"default-branch-svg fa-7x"}),Object(y.jsx)(k.a.Body,{children:Object(y.jsx)(k.a.Title,{children:Object(y.jsx)("h3",{className:"m-0",children:t.title})})}),Object(y.jsx)(k.a.Body,{className:"py-0",children:Object(y.jsxs)(S.a,{className:"list-group-flush",children:[Object(y.jsxs)(C.a,{className:"limb p-0 d-flex justify-content-between",children:[Object(y.jsx)("div",{className:"text-left font-weight-bolder",children:"Artist"}),Object(y.jsx)("div",{className:"text-right font-weight-bolder",children:"Venue/Tickets"})]}),0===t.limbs.length?Object(y.jsx)("h5",{children:"No branch limbs found :( Either this branch has no limbs, and can be deleted, or try reloading the page to see the newest entries!"}):t.limbs.map((function(t,s){return Object(y.jsxs)(C.a,{className:"limb p-0 d-flex justify-content-between align-text-center",children:[Object(y.jsx)("div",{className:"text-left",children:Object(y.jsx)("a",{href:t.song_url,children:t.artist_name})}),Object(y.jsx)("div",{className:"text-right",children:Object(y.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:t.event_uri,children:t.venue_name})}),Object(y.jsx)("button",{className:"btn-delete",onClick:function(){e.props.handleLimbDelete(t)},children:"x"})]},s)}))]})}),Object(y.jsx)(w.a,{className:"mt-0 mb-2 mx-auto",onClick:function(){return e.props.handleBranchDelete(t)},children:"Delete Branch"})]},s)})),Object(y.jsxs)(N.a,{className:"main",size:"lg",show:this.props.show,onHide:this.props.handleClose,children:[Object(y.jsx)(N.a.Header,{closeButton:!0,children:Object(y.jsxs)(N.a.Title,{children:["".concat(this.props.first_name,"'s")," Branches"]})}),Object(y.jsx)(N.a.Body,{children:Object(y.jsx)("div",{className:"d-flex flex-wrap align-items-baseline justify-content-around",children:0!==t.length?t:Object(y.jsx)("h3",{children:"No branches found!"})})}),Object(y.jsx)(N.a.Footer,{children:Object(y.jsx)(w.a,{variant:"secondary",onClick:this.props.handleClose,children:"Close"})})]})}}]),s}(n.a.Component);s(87);g.a.defaults.xsrfCookieName="csrftoken",g.a.defaults.xsrfHeaderName="X-CSRFToken";var P=new x.a,L="io09K9l3ebJxmxe2",D=function(e){Object(u.a)(s,e);var t=Object(m.a)(s);function s(e){var a;return Object(r.a)(this,s),(a=t.call(this,e)).state={token:null,first_name:"",uid:"",id:"",item:{album:{images:[{url:""}]},name:"",artists:[{name:"",id:""}],duration_ms:0},is_playing:"Paused",progress_ms:0,intervalID:0,root_artists:[],root_artists_selected:[],use_now_playing:!1,use_top_artists:!1,root_artists_selection_complete:!1,genre_set:new Set,navigator_has_geolocation:!1,geolocation_started:!1,geolocation_complete:!1,latitude:0,longitude:0,city:"",region:"",country_code:"",artists_all:[],artists:[],events_all:[],events_artists:[],events:[],matches:[],limbs:[],no_limb_error_show:!1,branch_name:"",branch:[],preview:"",image:null,playlist_id:"",playlist_uri:"",limbs_user:[],branches_user:[],show_modal:!1},a.myRef=n.a.createRef(),a.getNowPlaying=a.getNowPlaying.bind(Object(h.a)(a)),a.useTopArtists=a.useTopArtists.bind(Object(h.a)(a)),a.useNowPlaying=a.useNowPlaying.bind(Object(h.a)(a)),a.selectArtist=a.selectArtist.bind(Object(h.a)(a)),a.useMyLocation=a.useMyLocation.bind(Object(h.a)(a)),a.findEvents=a.findEvents.bind(Object(h.a)(a)),a.handleImageChange=a.handleImageChange.bind(Object(h.a)(a)),a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.makeLimbs=a.makeLimbs.bind(Object(h.a)(a)),a.makeBranch=a.makeBranch.bind(Object(h.a)(a)),a.handleLimbDelete=a.handleLimbDelete.bind(Object(h.a)(a)),a.handleLimbDeleteModal=a.handleLimbDeleteModal.bind(Object(h.a)(a)),a.handleBranchDelete=a.handleBranchDelete.bind(Object(h.a)(a)),a.save=a.save.bind(Object(h.a)(a)),a.load=a.load.bind(Object(h.a)(a)),a}return Object(d.a)(s,[{key:"componentDidMount",value:function(){var e=this,t=["accessible","accomplished","ambitious","assured","bangin","beautiful","blissful","bold","breathtaking","brilliant","catchy","cerebral","classic","clean","clever","cleverly-written","cohesive","complex","conceptual","danceable","definitive","deftly-produced","delightful","dynamic","ebullient","eclectic","ecstatic","effortless","emotionally-rich","endlessly-playable","enigmatic","enterntaining","epic","ethereal","exceptional","exhilarating","expansive","notable","nuanced","number","operatic","passionate","percussion-saoked","perfect","piercing","playful","poetic","poignant","polished","primal","progressive","radical","raw","refined","refrain","relentless","reliably-solid","reverbed","rhythimic","riotous","riveting","rollicking","satisfying","saturated","sculptural","seductive","sensitive","skilled","skillful","soaring","solid","sombre","sonic","sophisticated","feel-good","finely-calibrated","flawless","fluid","focused","fresh","funky","grandiose","groundbreaking","harmonic","harmonically-rich","headbanging","heartfelt","hi-fi","highly-listenable","highly-recommended","hypnotic","indulgent","innocent","instrospective","instrumental","intoxicating","inventice","invigorating","inviting","latest","layered","limitless","listenable","lush","lyrical","masterful","mesmerizing","midtempo","moody","musical","mythical","sprawling","staccato","stratospheric","strident","striking","studied","stunning","stylish","stylistic","sublime","successful","surprising","symphonic","synthetic","talented","tender","textured","thrilling","throbbing","thunderous","tight","timeless","top-flight","trademark","trailblazing","transcendent","transporting","unexpected","unfied","unique","unpredictable","unsung","upbeat","visionary","vocal","well-rounded","well-tooled"],s=["Alder","Apple","Ash","Aspen","Basswood","Birch","Buckeye","Buckthorn","California-laurel","Catalpa","Cedar","Cherry","Chestnut","Chinkapin","Cottonwood","Cypress","Dogwood","Douglas-fir","Elm","Filbert","Fir","Giant","Hawthorn","Hazel","Hemlock","Holly","Honeylocust","Horsechestnut","Incense-cedar","Juniper","Larch","Locust","Madrone","Maple","Mountain-ash","Mountain-mahogany","Oak","Oregon-myrtle","Pear","Pine","Plum","Poplar","Redcedar","Arborvitae","Redwood","Russian-olive","Spruce","Sweetgum","Sycamore","Tanoak","Walnut","White-cedar","Willow","Yellow-poplar","Yew"],a=t[Math.floor(Math.random()*t.length)],n=t[Math.floor(Math.random()*t.length)],i=s[Math.floor(Math.random()*s.length)];this.setState({branch_name:"".concat(a.toLowerCase(),"-").concat(n.toLowerCase(),"-").concat(i.toLowerCase())});var l=setInterval((function(){return e.getNowPlaying()}),3e3);this.setState({intervalID:l}),this.setState({navigator_has_geolocation:"geolocation"in navigator}),this.state.token?this.getNowPlaying():g.a.get("/api/v1/user-social-auth/").then((function(t){console.log("Check for login:",t),P.setAccessToken(t.data[0].extra_data.access_token),e.getNowPlaying(),e.setState({token:t.data[0].extra_data.access_token,first_name:t.data[0].user.first_name,uid:t.data[0].uid,id:t.data[0].id}),g.a.get("/api/v1/branches/").then((function(t){console.log("User Branches:",t),e.setState({branches_user:t.data})})).catch((function(e){return console.log(e)})),g.a.get("/api/v1/limbs/").then((function(t){console.log("User Limbs:",t),e.setState({limbs_user:t.data})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.intervalID)}},{key:"getNowPlaying",value:function(){var e=this;P.getMyCurrentPlaybackState().then((function(t){t&&e.setState({item:t.item,is_playing:t.is_playing,progress_ms:t.progress_ms})})).catch((function(t){console.log(t),e.setState({item:{album:{images:[{url:""}]},name:"",artists:[{name:"",id:""}],duration_ms:0},is_playing:"Spotify Not Currently in use",progress_ms:0})}))}},{key:"useNowPlaying",value:function(){var e=this;P.getArtistRelatedArtists(this.state.item.artists[0].id).then((function(t){console.log("Artists Related to Now Playing:",t);var s=t.artists;P.getArtist(e.state.item.artists[0].id).then((function(t){console.log("Also, Now Playing Artist:",t),s.unshift(t),e.setState({root_artists:s,use_now_playing:!0,use_top_artists:!1,genre_set:new Set})})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}},{key:"useTopArtists",value:function(){var e=this;P.getMyTopArtists().then((function(t){console.log("Top Artists: ",t),e.setState({root_artists:t.items,use_top_artists:!0,use_now_playing:!1,genre_set:new Set})})).catch((function(e){console.log(e)}))}},{key:"selectArtist",value:function(e){if(this.state.root_artists_selected.includes(e)){var t=Object(o.a)(this.state.root_artists_selected);t.splice(t.indexOf(e),1),this.setState({root_artists_selected:t})}else{var s=Object(o.a)(this.state.root_artists_selected);s.push(e),this.setState({root_artists_selected:s})}}},{key:"findArtists",value:function(){for(var e=this,t=[],s=0;s<this.state.root_artists_selected.length;s++)t.push(this.state.root_artists_selected[s].id);P.getArtists(t).then((function(t){console.log("Selected Artist:",t);var s=Object(o.a)(e.state.artists_all);s=s.concat(t.artists);var a=t.artists.map((function(e){return e.genres})).values();a=new Set(Array.from(a).flat());var n=new Set([].concat(Object(o.a)(e.state.genre_set),Object(o.a)(a)));e.setState({artists_all:s,genre_set:n})}));for(var a=function(t){P.getArtistRelatedArtists(e.state.root_artists_selected[t].id).then((function(t){console.log("Related to Selected Artist:",t);var s=Object(o.a)(e.state.artists_all);s=s.concat(t.artists);var a=t.artists.map((function(e){return e.genres})).values();a=new Set(Array.from(a).flat());var n=new Set([].concat(Object(o.a)(e.state.genre_set),Object(o.a)(a)));e.setState({artists_all:s,genre_set:n})})).catch((function(e){console.log(e)})).finally((function(){t===e.state.root_artists_selected.length-1&&(console.log("# of artists found: ".concat(e.state.artists_all.length)),console.log("# of genres found: ",e.state.genre_set.size),console.log("genres found: ",e.state.genre_set))}))},n=0;n<this.state.root_artists_selected.length;n++)a(n)}},{key:"useMyLocation",value:function(e){e.preventDefault(),this.setState({geolocation_started:!0});var t=this;navigator.geolocation.getCurrentPosition((function(e){t.setState({latitude:e.coords.latitude,longitude:e.coords.longitude,geolocation_complete:!0,events_all:[]}),t.findEvents()}),(function(e){console.error("An error has occured while retrieving location",e)}))}},{key:"findEvents",value:function(){var e=this;g()({method:"get",url:"https://api.songkick.com/api/3.0/events.json?apikey=".concat(L,"&location=geo:").concat(this.state.latitude,",").concat(this.state.longitude,"&page=1")}).then((function(t){var s;e.setState({events_all:t.data.resultsPage.results.event});var a=Object(o.a)(e.state.events_artists);for(s=0;s<e.state.events_all.length;s++){var n=e.state.events_all[s],i=void 0;for(i=0;i<n.performance.length;i++)a.push(n.performance[i].artist)}e.setState({events_artists:a}),t.data.resultsPage.totalEntries>t.data.resultsPage.results.event.length&!1&&function(){var s=t.data.resultsPage.totalEntries,a=t.data.resultsPage.perPage;console.log("There are ".concat(s," results and ").concat(a," on each page")),console.log("Which means the site needs to make ".concat(Math.ceil(s/a)," calls total")),console.log("and the last call should have ".concat(s%a," entries"));for(var n=Math.ceil(s/a),i=function(t){g()({method:"get",url:"https://api.songkick.com/api/3.0/events.json?apikey=".concat(L,"&location=geo:").concat(e.state.latitude,",").concat(e.state.longitude,"&page=").concat(t+1)}).then((function(t){var s=Object(o.a)(e.state.events_all);s=s.concat(t.data.resultsPage.results.event),e.setState({events_all:s});for(var a=Object(o.a)(e.state.events_artists),n=0;n<e.state.events_all.length;n++)for(var i=e.state.events_all[n],l=0;l<i.performance.length;l++)a.includes(i.performance[l].artist)||a.push(i.performance[l].artist);e.setState({events_artists:a})})).catch((function(e){return console.log(e)})).finally((function(){t===n-1&&(console.log("Events Found:",e.state.events_all),console.log("Performing Artists Found:",e.state.events_artists))}))},l=1;l<n;l++)i(l)}()})).catch((function(e){console.log(e)})).finally((function(){console.log("Events Found:",e.state.events_all),console.log("Performing Artists Found:",e.state.events_artists)}))}},{key:"makeLimbs",value:function(){var e=this;this.setState({limbs:[]});for(var t=Object(o.a)(this.state.events_all),s=Object(o.a)(this.state.artists_all),a=[],n=function(n){for(var i=s[n],l=function(s){for(var n=t[s],l=0;l<n.performance.length;l++){var c=n.performance[l];i.name!==c.artist.displayName||a.includes(i.name)||(a.push(i.name),P.getArtistTopTracks(i.id,"ES").then((function(t){var s=Object(o.a)(e.state.limbs),a={artist:i,song:t.tracks[0],event:n};s.includes(a)||(s.push(a),e.setState({limbs:s}))})).catch((function(e){return console.log(e)})))}},c=0;c<t.length;c++)l(c)},i=0;i<s.length;i++)n(i);console.log("This should be empty",a),0===a.length&&(console.log("this should show"),this.setState({no_limb_error_show:!0}))}},{key:"handleBranchDelete",value:function(e){var t=this;Object.keys(e).includes("playlist_id")&&P.unfollowPlaylist(e.playlist_id).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),g.a.delete("/api/v1/branch/".concat(e.id,"/")).then((function(s){var a=Object(o.a)(t.state.branches_user),n=a.indexOf(e);a.splice(n,1),t.setState({branches_user:a})})).catch((function(e){console.log(e)}))}},{key:"handleLimbDelete",value:function(e){var t=Object(o.a)(this.state.limbs),s=t.indexOf(e);t.splice(s,1),this.setState({limbs:t}),g.a.delete("/api/v1/limb/".concat(e.id,"/")).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},{key:"handleLimbDeleteModal",value:function(e){var t=Object(o.a)(this.state.limbs_user),s=t.indexOf(e);t.splice(s,1),this.setState({limbs_user:t}),g.a.delete("/api/v1/limb/".concat(e.id,"/")).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},{key:"makeBranch",value:function(e){var t=this;e.preventDefault();for(var s=this.state.uid,a=this.state.branch_name,n=[],i=0;i<this.state.limbs.length;i++)n.push(this.state.limbs[i].song.uri);P.createPlaylist(s,{name:a,description:"a playlist of upcoming events generated by branch.out"}).then((function(e){console.log("Create Playlist Response:",e);var s=Object(o.a)(t.state.branches_user);s.push({cover:t.state.preview,title:t.state.branch_name,limbs:t.state.branch,playlist_id:e.id,playlist_uri:e.uri}),t.setState({branches_user:s,playlist_id:e.id,playlist_uri:e.uri});var a=new FormData;a.append("title",t.state.branch_name),a.append("playlist_id",e.id),a.append("playlist_uri",e.uri),t.state.image&&a.append("cover",t.state.image);for(var i=[],l=0;l<t.state.limbs.length;l++){var c={artist_url:t.state.limbs[l].artist.uri,artist_id:t.state.limbs[l].artist.id,artist_name:t.state.limbs[l].artist.name,event_id:t.state.limbs[l].event.id,event_uri:t.state.limbs[l].event.uri,event_name:t.state.limbs[l].event.displayName,event_city:t.state.limbs[l].event.location.city,event_date:t.state.limbs[l].event.start.date,venue_name:t.state.limbs[l].event.venue.displayName,venue_id:t.state.limbs[l].event.venue.id,venue_url:t.state.limbs[l].event.venue.uri,song_url:t.state.limbs[l].song.uri,song_name:t.state.limbs[l].song.name,song_preview_url:t.state.limbs[l].song.preview_url};i.push(c)}i=JSON.stringify(i),a.append("limbs",i),g()({method:"post",url:"/api/v1/branch/",data:a,config:{headers:{"Content-Type":"multipart/form-data"}}}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),P.addTracksToPlaylist(e.id,n).then((function(e){return console.log("Add tracks to playlist:",e)})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}},{key:"handleChange",value:function(e){this.setState(Object(c.a)({},e.target.name,e.target.value))}},{key:"handleImageChange",value:function(e){var t=this,s=e.target.files[0];this.setState({image:s});var a=new FileReader;a.onloadend=function(){t.setState({preview:a.result})},a.readAsDataURL(s)}},{key:"save",value:function(){var e={};e.token=this.state.token,e.artists=this.state.artists,e.artists_all=this.state.artists_all,e.events=this.state.events,e.events_all=this.state.events_all,e.events_artists=this.state.events_artists,e.is_playing=this.state.is_playing,e.item=this.state.item,e.latitude=this.state.latitude,e.limbs=this.state.limbs,e.longitude=this.state.longitude,e.matches=this.state.matches,e.progress_ms=this.state.progress_ms,e.root_artists=this.state.root_artists,e.root_artists_selected=this.state.root_artists_selected,e.root_artists_selection_complete=this.state.root_artists_selection_complete,e.use_latlong=this.state.use_latlong,e.use_now_playing=this.state.use_now_playing,e.use_top_artists=this.state.use_top_artists,e.use_zipcode=this.state.use_zipcode,e.first_name=this.state.first_name,e.zipcode=this.state.zipcode,e.uid=this.state.uid,e.id=this.state.id,e.show_modal=this.state.show_modal,e.genre_set=this.state.genre_set,e.no_limb_error_show=this.state.no_limb_error_show,localStorage.setItem("state",JSON.stringify(e)),console.log("State Saved!"),console.log(e)}},{key:"load",value:function(){var e=JSON.parse(localStorage.getItem("state"));this.setState(e),console.log("State Loaded!"),console.log(e)}},{key:"render",value:function(){var e=this,t=this.state.root_artists.map((function(t,s){return Object(y.jsxs)("button",{className:"btn root-artist-btn ".concat(e.state.root_artists_selected.includes(t)?"btn-selected":""),onClick:function(){return e.selectArtist(t)},children:[Object(y.jsx)("img",{className:"root-artist-img",src:t.images[0].url,alt:"profile for ".concat(t.name)}),t.name]},s)})),s=this.state.limbs.map((function(t,s){return Object(y.jsxs)("div",{className:"limb d-flex align-text-center",children:[Object(y.jsx)("div",{className:"d-none d-md-flex",children:s+1}),Object(y.jsx)("div",{className:"col-4 col-lg-3 text-left",children:Object(y.jsx)("a",{href:t.artist.uri,children:t.artist.name})}),Object(y.jsx)("div",{className:"col-lg-3 text-left d-none d-lg-flex",children:Object(y.jsx)("a",{href:t.song.uri,children:t.song.name})}),Object(y.jsx)("div",{className:"col-6 col-lg-2 venue-wrap",children:Object(y.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:t.event.venue.uri,children:t.event.venue.displayName})}),Object(y.jsx)("div",{className:"col-lg-1 d-none d-lg-flex",children:Object(y.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:t.event.uri,children:"get tix"})}),Object(y.jsx)("div",{className:"col-lg-2 d-none d-lg-flex",children:t.event.location.city.replace(", US","")}),Object(y.jsx)("div",{children:t.event.start.date.slice(5,t.event.start.date.length)}),Object(y.jsx)("button",{className:"btn-delete",onClick:function(){return e.handleLimbDelete(t)},children:"x"})]},s)})),a=Object(y.jsxs)("div",{className:"limbs",children:[Object(y.jsxs)("div",{className:"limb font-weight-bolder",children:[Object(y.jsx)("div",{className:"d-none d-md-flex",children:"#"}),Object(y.jsx)("div",{className:"col-4 col-lg-3 text-left",children:"Artist"}),Object(y.jsx)("div",{className:"col-lg-3 d-none d-lg-flex text-left",children:"Top Song"}),Object(y.jsx)("div",{className:"col-6 col-lg-2",children:"Venue"}),Object(y.jsx)("div",{className:"col-lg-1 d-none d-lg-flex",children:"Tickets"}),Object(y.jsx)("div",{className:"col-lg-2 d-none d-lg-flex",children:"City"}),Object(y.jsx)("div",{children:"Date"})]}),s]});return Object(y.jsx)("div",{className:"App",children:Object(y.jsxs)("header",{className:"App-header",children:[false,Object(y.jsx)(A,{show:this.state.show_modal,branches:this.state.branches_user,limbs:this.state.limbs_user,handleClose:function(){return e.setState({show_modal:!1})},handleBranchDelete:this.handleBranchDelete,handleLimbDelete:this.handleLimbDeleteModal,first_name:this.state.first_name}),Object(y.jsx)("h1",{className:"".concat(this.state.token?"title d-none d-md-flex animate-md fadeOutLeftMD":"title title-login m-auto animate fadeInUp one"),children:"branch.out"}),!this.state.token&&Object(y.jsxs)("div",{className:"d-flex flex-column align-items-center m-auto animate fadeInUp two",children:[Object(y.jsx)(j.a,{className:"my-2",icon:f.d}),Object(y.jsx)("h3",{className:"welcome-line m-2",children:"Welcome to branch.out"}),Object(y.jsx)("h3",{className:"welcome-line m-2",children:"A site that helps people find new music, coming to a nearby stage"}),Object(y.jsx)("h3",{className:"welcome-line m-2",children:"Let's find the the next concert that you will never forget"}),Object(y.jsx)(j.a,{className:"my-2",icon:f.d}),Object(y.jsx)("a",{className:"btn btn-login animate fadeInUp three my-3",href:"/social/login/spotify/",children:"Login to Spotify"})]}),Object(y.jsx)("nav",{className:"scrollspy-placeholder fixed-left",children:Object(y.jsx)("ul",{})}),this.state.token&&Object(y.jsx)("div",{children:Object(y.jsxs)("div",{className:"top-bar fixed-top d-flex align-items-center justify-content-between p-2",children:[Object(y.jsxs)("h4",{className:"",children:["Hey, ",this.state.first_name]}),Object(y.jsxs)("div",{className:"top-right-btns",children:[Object(y.jsxs)("button",{type:"button",className:"btn btn-primary",onClick:function(){return e.setState({show_modal:!0})},children:["My Branches (",this.state.branches_user.length,")"]}),Object(y.jsx)("a",{href:"/accounts/logout/",className:"btn-logout btn m-2",children:"Logout"})]})]})}),this.state.token&&Object(y.jsxs)("div",{className:"w-100",children:[Object(y.jsxs)("section",{className:"player-wrapper justify-content-center",children:[this.state.item.album.images[0].url?Object(y.jsx)(O,{item:this.state.item,is_playing:this.state.is_playing,progress_ms:this.state.progress_ms}):Object(y.jsxs)("div",{children:[Object(y.jsx)("h3",{children:"Let's get started."}),Object(y.jsx)("div",{children:"To make sure your Spotify is connected, play a song (on your phone, or any device)"})]}),false]}),Object(y.jsx)("button",{className:"btn ".concat(this.state.use_now_playing?"btn-selected":""," "),onClick:function(){return e.useNowPlaying()},children:"Use Related Artists"}),Object(y.jsx)("button",{className:"btn ".concat(this.state.use_top_artists?"btn-selected":""," "),onClick:function(){return e.useTopArtists()},children:"Use Your Top Artists"})]}),Object(y.jsxs)("section",{className:"".concat(this.state.use_now_playing||this.state.use_top_artists?"animate fadeInRight d-flex flex-column align-items-center":"d-none"," "),children:[Object(y.jsx)("h2",{className:"animate fade-in-right my-4 align-self-baseline ",children:"Please select at least 3 root artists to continue:"}),Object(y.jsxs)("div",{className:"d-sm-flex d-inline align-items-center",children:[Object(y.jsxs)("div",{children:[Object(y.jsx)("button",{className:"btn",onClick:function(){return e.setState({root_artists_selected:e.state.root_artists})},children:"All"}),Object(y.jsx)("button",{className:"btn",onClick:function(){return e.setState({root_artists_selected:[]})},children:"None"})]}),Object(y.jsx)("div",{children:t})]}),Object(y.jsx)("div",{children:Object(y.jsx)("button",{onClick:function(){e.state.root_artists_selected.length>=3&&(e.setState({root_artists_selection_complete:!0}),e.findArtists())},className:"mt-5\n                ".concat(this.state.root_artists_selected.length>=3?"btn":"btn btn-disabled","\n                ").concat(this.state.root_artists_selection_complete?"btn-selected":"","\n                "),children:"Continue Using These Artists"})})]}),this.state.root_artists_selection_complete&&Object(y.jsxs)("section",{className:"location d-flex justify-content-center animate fadeInLeft",children:[!1,Object(y.jsxs)("div",{className:"location-geo m-4 ".concat(this.state.navigator_has_geolocation?"d-flex flex-column":"d-none"),children:[Object(y.jsx)("h4",{className:"m-4",children:"Let's figure out where to search for concerts! Click the button below:"}),this.state.geolocation_complete?Object(y.jsx)("button",{className:"btn m-auto btn-selected",children:"Found!"}):Object(y.jsxs)("button",{className:"btn m-auto find-location-btn",onClick:this.useMyLocation,children:["Find My Location",this.state.geolocation_started&&!this.state.geolocation_complete&&Object(y.jsx)("div",{className:"loader"})]})]}),Object(y.jsxs)("div",{className:"location-zip m-4 ".concat(this.state.navigator_has_geolocation?"d-none":"d-flex"),children:[Object(y.jsx)("div",{children:"We're sorry, your browser doesn't support geolocation :("}),Object(y.jsx)("div",{children:"Location by US zipcode is still currently in development"})]})]}),Object(y.jsxs)("div",{className:" ".concat(this.state.root_artists_selection_complete&&0!==this.state.latitude?"d-flex flex-column":"d-none"),children:[Object(y.jsx)("h4",{children:"Let's do the thing"}),Object(y.jsx)("button",{className:"btn m-auto",onClick:function(){e.setState({no_limb_error_show:!1}),e.makeLimbs()},children:"Grow New Branch"})]}),this.state.no_limb_error_show&&Object(y.jsxs)(p.a,{className:"animate fadeInUp m-2",variant:"danger",onClose:function(){return e.setState({no_limb_error_show:!1})},dismissible:!0,children:[Object(y.jsx)(p.a.Heading,{children:"Uh oh! We couldn't find any matches :("}),Object(y.jsx)("p",{children:"Sorry, we weren't able to find any good suggestions with those inputs. Try increasing the number of input artists, or using the artist you're listening to currently to guide the results a bit. If nothing else, check back another time, as we're still perfecting the searching process."})]}),this.state.limbs.length>0&&Object(y.jsxs)("section",{className:"animate fadeInUp",children:[Object(y.jsx)("header",{children:Object(y.jsxs)("form",{onSubmit:this.makeBranch,className:"new-branch-form m-2 d-flex flex-column flex-lg-row align-items-center justify-content-around",children:[Object(y.jsx)("button",{type:"button",icon:"file",onClick:function(){return e.myRef.current.click()},className:"btn branch-img-preview-btn",children:this.state.image?Object(y.jsx)("img",{className:"branch-img-preview",src:this.state.preview,alt:"branch cover preview",width:"200"}):Object(y.jsxs)("div",{children:[Object(y.jsx)(j.a,{icon:f.d,className:"fa-7x"}),Object(y.jsx)("br",{}),Object(y.jsx)("p",{children:"cover image upload"})]})}),Object(y.jsx)("input",{className:"d-none",ref:this.myRef,type:"file",name:"image",onChange:this.handleImageChange}),Object(y.jsxs)("div",{className:"text-left",children:[Object(y.jsx)("h3",{children:"Here's your new branch, let's give it a name:"}),Object(y.jsx)("input",{className:"branch-name-input",name:"branch_name",value:this.state.branch_name,onChange:this.handleChange,type:"text"})]}),Object(y.jsx)("div",{children:""===this.state.playlist_id?Object(y.jsxs)("button",{className:"btn",type:"submit",onClick:this.makeBranch,children:["Save branch &",Object(y.jsx)("br",{})," export to spotify"]}):Object(y.jsx)("a",{className:"btn btn-selected",href:this.state.playlist_uri,children:"View On Spotify"})})]})}),a]}),Object(y.jsxs)("footer",{className:"bottom-bar fixed-bottom d-flex align-items-center justify-content-between p-2",children:[Object(y.jsxs)("div",{className:"ccs-thank-you mr-5 text-left d-md-inline d-none",children:["Created at ",Object(y.jsx)("a",{href:"https://carolinacodeschool.org/",children:"Carolina Code School"}),Object(y.jsx)("br",{}),"Presented Nov, 15th 2019"]}),Object(y.jsxs)("div",{className:"created-by col-12 col-sm text-center text-sm-left text-md-center p-0",children:["branch.out was made by Joe Powers:",Object(y.jsx)("a",{className:"mx-1",href:"https://github.com/ReadySetJoe",children:Object(y.jsx)(j.a,{icon:f.b})}),Object(y.jsx)("a",{className:"mx-1",href:"https://www.linkedin.com/in/joe-powers/",children:Object(y.jsx)(j.a,{icon:f.c})})]}),Object(y.jsxs)("div",{className:"citations ml-5 d-sm-flex d-none flex-row align-items-center",children:[Object(y.jsx)("span",{children:"API:"}),Object(y.jsxs)("div",{className:"citations-api text-left mx-2",children:[Object(y.jsx)("div",{className:"citation-spotify",children:Object(y.jsxs)("a",{href:"https://developer.spotify.com/",children:["Spotify ",Object(y.jsx)(j.a,{icon:f.e})]})}),Object(y.jsx)("div",{className:"citation-songkick",children:Object(y.jsxs)("a",{href:"https://www.songkick.com/developer",children:["Songkick ",Object(y.jsx)("img",{className:"songkick-badge-img",alt:"songkick badge",src:v})]})})]}),"Style:",Object(y.jsxs)("div",{className:"citations-style text-left mx-2",children:[Object(y.jsx)("div",{className:"citation-fontawesome",children:Object(y.jsxs)("a",{href:"https://fontawesome.com/",children:["Font Awesome ",Object(y.jsx)(j.a,{icon:f.a})]})}),Object(y.jsx)("div",{className:"citation-style",children:Object(y.jsxs)("a",{href:"https://github.com/JoeKarlsson/react-spotify-player",children:["Joe Karlssons ",Object(y.jsx)(j.a,{icon:f.b})]})})]})]})]})]})})}}]),s}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(Object(y.jsx)(D,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[88,1,2]]]);
//# sourceMappingURL=main.d45de98f.chunk.js.map