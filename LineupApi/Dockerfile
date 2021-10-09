FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as Base

WORKDIR /app

COPY LineupApi.csproj .
RUN dotnet restore
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools" 

COPY . .

EXPOSE 5000

CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000"]

FROM base AS builder 

COPY . .

RUN dotnet publish -c Release -o /publish


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS publish

WORKDIR /app

COPY --from=builder /publish .

EXPOSE 80
CMD ["dotnet", "LineupApi.dll"]