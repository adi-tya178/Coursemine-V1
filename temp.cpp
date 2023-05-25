#include<bits/stdc++.h>
using namespace std;


int smallestDivisor(int n)
{
    if (n % 2 == 0)
        return 2;
 
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0)
            return i;
    }
 
    return n;
}

int smallestprime(unordered_map<int,int> &prime,vector<int> A,int u,int v) {
    int ans = INT_MAX;
    for(int i=u;i<=v;i++) {
        if(prime.find(A[u]) != prime.end()) {
            ans =min(ans,prime[A[i]]);
        }
        else {
            int t = smallestDivisor(A[i]);
            prime[A[i]] = t;
            ans = min(ans,t);
        }
        
    }
    return ans;
}
vector<long long> divisionQueries(int N,int Q,vector<int> A,vector<vector<int>> queries ) {

    unordered_map<int,int> prime;
    vector<long long> ans;
    for(int i=0;i<Q;i++) {
        if(queries[i][0] == 1) {
            int d = smallestprime(prime,A,queries[i][1]-1,queries[i][2]-1);

            for(int i=queries[i][1]-1;i<=queries[i][2]-1;i++) {
                A[i] = A[i] % d;
            }
        }
        else if(queries[i][1] == 2) {
            long long sum = 0;
            for(int i=queries[i][1]-1;i<=queries[i][2]-1;i++) {
                sum += A[i];
            }
            ans.push_back(sum);
        }
        else {
            A[queries[i][1] - 1] = queries[i][2];
        }
    }
    return ans;
}


int main() {
    int N = 5,Q = 3;
    vector<int> A = {10,2,8,7,6};

    vector<vector<int>> q = {
        {2,1,4},
        {1,1,4},
        {2,1,4}
    } ;


    // vector<long long> aa = divisionQueries(N,Q,A,q);

    for(auto &e:aa) cout <<  e << " ";
}