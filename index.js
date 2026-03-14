let issues = [];

const loadIssues = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/`;
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            displayCardIssues(data.data);
            issues = data.data;
        })
}
loadIssues();
// const displayLoadIssuues = (issues) => {
//     const levelContainer = document.getElementById('level-container');
//     for (const issue of issues) {
//         console.log(issue);
//         const btnDiv = document.createElement('div');
//         btnDiv.innerHTML = `
//      <button class="btn btn-primary w-[120px]">All</button>
//     `
//         levelContainer.append(btnDiv);
//     }



// }
document.getElementById('btn-all').addEventListener('click', function () {

    displayCardIssues(issues);
    console.log(issues);
})
document.getElementById('btn-open').addEventListener('click', function () {
    const openIssues = issues.filter(issue => issue.status === 'open');
    displayCardIssues(openIssues);
    console.log(openIssues);
})
document.getElementById('btn-close').addEventListener('click', function () {
    const openIssues = issues.filter(issue => issue.status === 'closed');
    displayCardIssues(openIssues);
    console.log(openIssues);
})

const displayCardIssues = (issues) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    issues.forEach(issue => {
        const card = document.createElement('div');
        card.innerHTML = `
      
  <div class="w-[260px] h-[410px] shadow-sm py-2 px-5  border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-purple-600'} flex flex-col-3  flex-wrap rounded-lg">
            <div class="bg-base-100  flex justify-between gap-5 ">
                <div>
                    ${issue.status === 'open' ? ' <img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                </div>
                <div class="text-center text-[#EF4444] bg-[#FEECEC] w-[80px] h-[24px] rounded-lg ${issue.priority === 'high'
                ? 'text-red-500 bg-red-100'
                : issue.priority === 'medium'
                    ? 'text-yellow-500 bg-yellow-100'
                    : 'text-gray-500 bg-gray-100'}"">
                    ${issue.priority === 'high' ? 'High' : issue.priority === 'medium' ? 'Medium' : 'Low'}</div>
               

            </div>
            <br>
            <h3 class="font-semibold text-xl">Fix navigation menu on mobile devices${issue.title}</h3>

            <p class="text-gray-500">The navigation menu doesn't collapse properly on mobile devices...${issue.description}</p>
            <br>
            <div class="flex gap-2">
                <div
                    class="text-center text-[#EF4444] bg-[#FEECEC] w-[80px] h-[24px] rounded-lg border border-[#EF4444]">
                    <i class="fa-solid fa-bug"></i> Bug
                </div>
                <div
                    class="text-center text-[#D97706] bg-[#FFF8DB] w-[112px] h-[24px] rounded-lg border border-[#D97706]">
                    Help Wanted</div>
            </div>
            <br>
            <hr class="text-gray-500">
            <br>
            <div>
                <p class="text-gray-500">#1 john_doe${issue.author}</p>
                <p class="text-gray-500">1/15/2024${issue.date}</p>
            </div>
        </div>
`
        cardContainer.appendChild(card);
    })
}
