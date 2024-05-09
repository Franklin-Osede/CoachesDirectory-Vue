export default {
    registerCoach(context, data){
        const coachData = {
            id:'c3',
            firstANme: data.first,
            loastName: data.last,
            description: data.desc,
            hourlyRate:data.rate,
            areas:data.areas
        };

        context.commit('registerCoach', coachData)
    }
}