const {zokou} = require("../framework/zokou");
const conf = require("../set");
const {getMessagesAndXPByJID,getBottom10Users} = require("../bdd/level");


function get_level_exp(xp) {
    const levelThresholds = [
        { level: 1, xpThreshold: 1},
        { level: 2, xpThreshold: 2 },
        { level: 3, xpThreshold: 3 },
        { level: 4, xpThreshold: 4},
        { level: 5, xpThreshold: 5},
        { level: 6, xpThreshold: 6},
        { level: 7, xpThreshold: 7},
        { level: 8, xpThreshold: 8},
        { level: 9, xpThreshold: 9},
        { level: 10, xpThreshold: 10},
        { level: 11, xpThreshold: 11},
        { level: 12, xpThreshold: 12},
        { level: 13, xpThreshold: 13},
        { level: 14, xpThreshold: 14},
        { level: 15, xpThreshold: 15},
        { level: 16, xpThreshold: 16},
        { level: 17, xpThreshold: 17},
        { level: 18, xpThreshold: 18},
        { level: 19, xpThreshold: 19},
        { level: 20, xpThreshold: 20},
        { level: 21, xpThreshold: 21},
        { level: 22, xpThreshold: 22},
        { level: 23, xpThreshold: 23},
        { level: 24, xpThreshold: 24},
        { level: 25, xpThreshold: 25},
        { level: 26, xpThreshold: 26},
        { level: 27, xpThreshold: 27},
        { level: 28, xpThreshold: 28},
        { level: 29, xpThreshold: 29},
        { level: 30, xpThreshold: 30},
        { level: 31, xpThreshold: 31},
        { level: 32, xpThreshold: 32},
        { level: 33, xpThreshold: 33},
        { level: 34, xpThreshold: 34},
        { level: 35, xpThreshold: 35},
        { level: 36, xpThreshold: 36},
        { level: 37, xpThreshold: 37},
        { level: 38, xpThreshold: 38},
        { level: 39, xpThreshold: 39},
        { level: 40, xpThreshold: 40},
        { level: 41, xpThreshold: 41},
        { level: 42, xpThreshold: 42},
        { level: 43, xpThreshold: 43},
        { level: 44, xpThreshold: 44},
        { level: 45, xpThreshold: 45},
        { level: 46, xpThreshold: 46},
        { level: 47, xpThreshold: 47},
        { level: 48, xpThreshold: 48},
        { level: 49, xpThreshold: 49},
        { level: 'Toman GOD', xpThreshold: 50}
    ];

    let level = 0;
    let exp = xp;
    let xplimit = levelThresholds[level].xpThreshold;

    for (let i = 0; i < levelThresholds.length; i++) {
        if (xp >= levelThresholds[i].xpThreshold) {
            level = levelThresholds[i].level;
            xplimit = levelThresholds[i + 1]?.xpThreshold || 'No-limit';
            exp = xp - levelThresholds[i].xpThreshold;
        } else {
            break;
        }
    }

    return {
        level: level,
        xplimit: xplimit,
        exp: exp
    };
}

module.exports = {
   get_level_exp,
} ;

zokou( {
  nomCom : "rank",
 categorie : "Fun",
   }, 
   async(dest,zk, commandeOptions)=> {
  
    const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu , mybotpic} = commandeOptions ;

  if (msgRepondu) {
      
       try {
          
        let rank = await getMessagesAndXPByJID(auteurMsgRepondu) ;

        const data = await get_level_exp(rank.xp)
         let ppuser ;
    
         
         try {
              ppuser = await zk.profilePictureUrl(auteurMsgRepondu , 'image') ;
         } catch {
            ppuser = mybotpic()
         } ;
    
    
         let role ;
    
         if (data.level < 5) {
         role = 'rookie'
         } else if (data.level >= 5 && data.level < 10) {
         role = 'street punk'
         } else if (data.level >= 10 && data.level < 15) {
         role = 'low-level thug'
         } else if (data.level >= 15 && data.level < 20) {
         role = 'mid-level thug'
         } else if (data.level >= 20 && data.level < 25) {
         role = 'high-level thug'
         } else if (data.level >= 25 && data.level < 30) {
         role = 'gang lieutenant'
         } else if (data.level >= 30 && data.level < 35) {
          role = 'gang leader'
         } else if (data.level >= 35 && data.level < 40) {
         role = 'right-hand man'
         } else if (data.level >= 40 && data.level < 45) {
          role = 'elite member'
         } else if (data.level >= 45 && data.level < 50) {
          role = 'Tokyo Manji Gang captain'
         } else {
         role = 'Toman God'
}

    
    
         let msg = `
┏━━━┛ Toman Ranking┗━━━┓
         
    *Name :* @${auteurMsgRepondu.split("@")[0]}
    
    *Level :* ${data.level}
    
    *EXP :* ${data.exp}/${data.xplimit}
    
    *Role :* ${role}

    *fights :* ${rank.messages}
    
   ┕━✿━┑  ┍━✿━┙`
    
     zk.sendMessage( 
        dest,
        {
            image : {url : ppuser},
            caption : msg,
            mentions : [auteurMsgRepondu]
        },
        {quoted : ms}
      )


       } catch (error) {
         repondre(error)
       }
  }   else {


      try {
        
        let jid = auteurMessage ;
          
        let rang = await getMessagesAndXPByJID(jid) ;

        const data =  get_level_exp(rang.xp)
         let ppuser ;
    
         
         try {
              ppuser = await zk.profilePictureUrl(jid, 'image') ;
         } catch {
            ppuser = mybotpic()
         } ;
    
    
         let role ;
    
                  if (data.level < 5) {
         role = 'rookie'
         } else if (data.level >= 5 && data.level < 10) {
         role = 'street punk'
         } else if (data.level >= 10 && data.level < 15) {
         role = 'low-level thug'
         } else if (data.level >= 15 && data.level < 20) {
         role = 'mid-level thug'
         } else if (data.level >= 20 && data.level < 25) {
         role = 'high-level thug'
         } else if (data.level >= 25 && data.level < 30) {
         role = 'gang lieutenant'
         } else if (data.level >= 30 && data.level < 35) {
          role = 'gang leader'
         } else if (data.level >= 35 && data.level < 40) {
         role = 'right-hand man'
         } else if (data.level >= 40 && data.level < 45) {
          role = 'elite member'
         } else if (data.level >= 45 && data.level < 50) {
          role = 'Tokyo Manji Gang captain'
         } else {
         role = 'Toman God'
         }
    
    
         let msg = `
┏━━━┛ Toman Ranking ┗━━━┓
     
  *Name :* ${nomAuteurMessage}

  *Level :* ${data.level}

  *EXP :* ${data.exp}/${data.xplimit}

  *Role :* ${role}

  *Fights :* ${rang.messages}

   ┕━✿━┑  ┍━✿━┙`
    
     zk.sendMessage( 
        dest,
        {
            image : {url : ppuser},
            caption : msg
        },
        {quoted : ms}
      )

      } catch (error) {
         repondre(error)
      }

    } 


}) ;

zokou( {
  nomCom : "toprank",
 categorie : "Fun",
   }, 
   async(dest,zk, commandeOptions)=> {
  
    const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu , mybotpic} = commandeOptions ;


       let msg = `┏━━┛ Toman-top-ranks┗━━┓\n\n`
       
      let topRanks = await getBottom10Users() ;
        let mention = [] ;
        for (const rank of topRanks ) {

             const data = await get_level_exp(rank.xp) ;

             let role ;
    
         if (data.level < 5) {
         role = 'rookie'
         } else if (data.level >= 5 && data.level < 10) {
         role = 'street punk'
         } else if (data.level >= 10 && data.level < 15) {
         role = 'low-level thug'
         } else if (data.level >= 15 && data.level < 20) {
         role = 'mid-level thug'
         } else if (data.level >= 20 && data.level < 25) {
         role = 'high-level thug'
         } else if (data.level >= 25 && data.level < 30) {
         role = 'gang lieutenant'
         } else if (data.level >= 30 && data.level < 35) {
          role = 'gang leader'
         } else if (data.level >= 35 && data.level < 40) {
         role = 'right-hand man'
         } else if (data.level >= 40 && data.level < 45) {
          role = 'elite member'
         } else if (data.level >= 45 && data.level < 50) {
          role = 'Tokyo Manji Gang captain'
         } else {
         role = 'Toman God'
         }
            msg += `-----------------------
            
 *Name :* @${rank.jid.split("@")[0]}
*Level :* ${data.level}
*Role :* ${role}\n` ;

        mention.push(rank.jid) ;
        }

       zk.sendMessage(dest,
                      {
                        image : { url : mybotpic() },
                        caption : msg,
                        mentions : mention
                      },
                      {quoted : ms})
       

   })


   
    
