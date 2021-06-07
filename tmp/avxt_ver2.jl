using BenchmarkTools
using LoopVectorization
function noAvxt!(n::Int64,bar::Matrix{Float64},foo::Matrix{Float64})
 for i = 2:n-1
  for j = 2:n-1
    foo[i, j] = (1 / 4) * ( bar[i,j-1]+bar[i, j+1]+bar[i-1, j]+bar[i+1, j])
  end
end
    
end

function withAvxt!(n::Int64,bar::Matrix{Float64},foo::Matrix{Float64})
  for i = 2:n-1
    @avxt for j = 2:n-1
      foo[i, j] = (1 / 4) * ( bar[i,j-1]+bar[i, j+1]+bar[i-1, j]+bar[i+1, j])
    end
 end
    
end

@btime noAvxt!($100,$randn(100,100),$zeros(100,100))
@btime withAvxt!($100,$randn(100,100),$zeros(100,100))

# まだ@avxtがついてる方が遅い…??
# noAvxt! :62.100 μs (4 allocations: 156.41 KiB)
# withAvxt!: 184.500 μs (3238 allocations: 1.14 MiB)