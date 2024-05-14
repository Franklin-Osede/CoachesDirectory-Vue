export default {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId;
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      };
  
      const token = context.rootGetters.token;
  
      const response = await fetch(
        `https://vue-http-demo-85e9e.firebaseio.com/coaches/${userId}.json?auth=` + token,
        {    
          method: 'PUT',
          body: JSON.stringify(coachData)
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        const error = new Error(errorData.message || 'Failed to update coach data.');
        throw error;
      }
  
      context.commit('registerCoach', {
        ...coachData,
        id: userId
      });
    },
  
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
  
      const response = await fetch(
        `https://coach-finder-5b5d6-default-rtdb.firebaseio.com/coaches.json`
      );
    
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        const error = new Error(errorData.message || 'Failed to fetch!');
        throw error;
      }
    
      const responseData = await response.json();
      console.log("jjj........", responseData);
    
      const coaches = [];
    
      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas
        };
        coaches.push(coach);
      }
    
      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    }
  };
  