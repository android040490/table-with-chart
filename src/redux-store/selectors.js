export const getStudents = (state) => {
    let {ids, entities} = state.students;
    return ids.map((item) => entities[item])
}