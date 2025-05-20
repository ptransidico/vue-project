const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const playerHealth = ref(100);
        const enemyHealth = ref(100);
        const round = ref(0);
        const logs = ref([]);

        const generateRandomNumber = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const attackEnemy = () => {
            // Simulate an attack
            const damage = generateRandomNumber(1, 10);
            enemyHealth.value -= damage;
            attackPlayer();
            round.value++;
            if (enemyHealth.value <= 0) {
                enemyHealth.value = 0;
            }
            logs.value.unshift('Hai inflitto '+damage+' danni al nemico.');
        };

        const attackEnemySpecial = () => {
            // Simulate a special attack
            const damage = generateRandomNumber(10, 20);
            enemyHealth.value -= damage;
            attackPlayer();
            round.value++;
            if (enemyHealth.value <= 0) {
                enemyHealth.value = 0;
            }
            logs.value.unshift(`Attacco speciale: ${damage} danni al nemico.`);
        };

        const attackPlayer = () => {
            // Simulate an attack on the player
            const damage = generateRandomNumber(1, 10);
            playerHealth.value -= damage;
            if (playerHealth.value <= 0) {
                playerHealth.value = 0
            }
            logs.value.unshift(`Il nemico ti ha colpito causando ${damage} danni.`);
        }

        const medikit = () => {
            const heal = generateRandomNumber(5, 15);
            playerHealth.value += heal;
            if (playerHealth.value > 100) {
                playerHealth.value = 100;
            }
            attackPlayer();
            round.value++;
            logs.value.unshift(`Hai usato un medikit e recuperato ${heal} HP.`);
        };

        const resetGame = () => {
            playerHealth.value = 100;
            enemyHealth.value = 100;
            round.value = 0;
            whoWins.value = "";
            logs.value = [];
        }

        const gameOver = () => {
            playerHealth.value = 0;
            logs.value.unshift(`Hai deciso di arrenderti.`);
        };

        const isGameOver = computed(() => {
            return playerHealth.value <= 0 || enemyHealth.value <= 0;
        });

        const playerBarStyle = computed(() => {
            return {
                width: playerHealth.value + "%",
            };
        });

        const enemyBarStyle = computed(() => {
            return {
                width: enemyHealth.value + "%",
            };
        });

        const attackEnemydisabled = computed(() => {
            return round.value % 3 !== 0;
        });

        const medikitDisabled = computed(() => {
            return playerHealth.value <= 50 && round.value % 3 === 0;
        });

        const whoWins = computed(() => {
            if (playerHealth.value <= 0 && enemyHealth.value <= 0) {
                return "draw";
            } else if (playerHealth.value <= 0) {
                return "enemy"
            } else if (enemyHealth.value <= 0) {
                return "player";
            }
            return "";
        }

        )

        return {
            round,
            attackEnemy,
            attackEnemySpecial,
            medikit,
            gameOver,
            playerHealth,
            enemyHealth,
            playerBarStyle,
            enemyBarStyle,
            attackEnemydisabled, medikitDisabled, whoWins, resetGame, isGameOver, logs
        };
    },
}).mount("#game");
