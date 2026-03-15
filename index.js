let issues = [];

function setActiveButton(activeId) {
    const buttons = ['btn-all', 'btn-open', 'btn-close'];

    buttons.forEach(id => {
        const btn = document.getElementById(id);
        btn.classList.remove('bg-blue-500', 'text-white'); // active style
    });

    document.getElementById(activeId).classList.add('bg-blue-500', 'text-white');
}

const loadIssues = (id) => {
    // manageSpinner(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/`;
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            // const clickBtn = document.getElementById('btn-all');
            // // console.log(clickBtn);
            // clickBtn.classlist.add('active');
            displayCardIssues(data.data);
            // manageSpinner(false);
            issues = data.data;
        })
}
loadIssues();
setActiveButton('btn-all');
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
    setActiveButton('btn-all');
})
document.getElementById('btn-open').addEventListener('click', function () {
    const openIssues = issues.filter(issue => issue.status === 'open');
    displayCardIssues(openIssues);
    console.log(openIssues);
    setActiveButton('btn-open');
})
document.getElementById('btn-close').addEventListener('click', function () {
    const openIssues = issues.filter(issue => issue.status === 'closed');
    displayCardIssues(openIssues);
    console.log(openIssues);
    setActiveButton('btn-close');
})
const loadCardDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const detail = await res.json();
    displayCardDetail(detail.data);

};
const displayCardDetail = (issue) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class='space-y-5'>
                    <h2 class='text-2xl font-bold'>Fix broken image uploads${issue.title}</h2>
                    <div class='flex '>
                        <p class=' rounded-full w-[65px] ${issue.status === 'open' ? 'bg-green-500' : 'bg-purple-500'}'>${issue.status === 'open' ? 'Open' : 'Closed'}</p>
                        <p class='text-gray-500 '>. Opened by  . 22/02/2026 ${issue.created_at}</p>
                    </div>
                    <div class="flex gap-2">
                        <div
                            class="text-center text-[#EF4444] bg-[#FEECEC] w-[80px] h-[24px] rounded-lg border border-[#EF4444]">
                            <i class="fa-solid fa-bug"></i> Bug
                        </div>
                        <div
                            class="text-center text-[#D97706] bg-[#FFF8DB] w-[112px] h-[24px] rounded-lg border border-[#D97706]">
                            Help Wanted</div>
                    </div>
                    <p class='text-gray-500'>The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive
                        behavior.${issue.description}</p>
                    <div class="bg-base-300 flex gap-20">
                        <div>
                            <p>Assignee:</p>
                            <p>${issue.assignee}</p>
                        </div>
                        <div>
                            <p>Priority:</p>
                            <p class="text-center  w-[80px] h-[24px] rounded-lg ${issue.priority === 'high' ? 'text-red-500 bg-red-100'
            : issue.priority === 'medium'
                ? 'text-yellow-500 bg-yellow-100'
                : 'text-gray-500 bg-gray-100'}" }">
                                ${issue.priority}</p>

                        </div>
                    </div>
                </div>
    
    `;
    document.getElementById('word_modal').showModal();
}
const displayCardIssues = (issues) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    issues.forEach(issue => {
        const card = document.createElement('div');
        card.innerHTML = `
      
  <div onclick="loadCardDetail(${issue.id})" class="w-[260px] h-[410px] shadow-sm py-2 px-5  border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-purple-600'} flex flex-col-3  flex-wrap rounded-lg">
            <div class="bg-base-100  flex justify-between gap-5 ">
                <div>
                    ${issue.status === 'open' ? ' <img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                </div>
                <div class="text-center text-[#EF4444] bg-[#FEECEC] w-[80px] h-[24px] rounded-lg ${issue.priority === 'high'
                ? 'text-red-500 bg-red-100'
                : issue.priority === 'medium'
                    ? 'text-yellow-500 bg-yellow-100'
                    : 'text-gray-500 bg-gray-100'}">
                    ${issue.priority === 'high' ? 'High' : issue.priority === 'medium' ? 'Medium' : 'Low'}</div>
               

            </div>
            <br>
            <h3  class="font-semibold text-xl">Fix navigation menu on mobile devices${issue.title}</h3>

            <p  class="text-gray-500">The navigation menu doesn't collapse properly on mobile devices...${issue.description}</p>
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

    });
    // manageSpinner(false);
}

// const manageSpinner = (status) => {
//     if (status === true) {
//         document.getElementById('spinner').classList.remove('hidden');
//         document.getElementById('above-card').classList.add('hidden');

//     } else {
//         document.getElementById('spinner').classList.add('hidden');
//         document.getElementById('above-card').classList.remove('hidden');

//     }
// }
