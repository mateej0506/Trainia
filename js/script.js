const form = document.querySelector('#user-form');
const output = document.querySelector('#plan-output');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = form.username.value;
  const goal = form.goal.value;
  const sessions = parseInt(form.sessions.value);
  const equipment = form.equipment.value;
  
  let splitType = '';
  if (sessions <= 2) splitType = 'Full Body';
  else if (sessions === 4) splitType = 'Upper/Lower';
  else if (sessions >= 5) splitType = 'Push/Pull/Legs';
  else splitType = 'Custom Split';

  let workout = `💪 Workout Plan for ${username} (${sessions}x/week, ${splitType}):\n\n`;

  for (let i = 1; i <= sessions; i++) {
    workout += `📅 Day ${i}:\n`;

    if (goal === 'muscle') {
      if (equipment === 'fully_equipped_gym' || equipment === 'basic_home_gym') {
        if (splitType === 'Full Body') {
          workout += `- Squats: 4x8\n- Bench Press: 4x8\n- Barbell Rows: 4x10\n- Overhead Press: 3x12\n`;
        } else if (splitType === 'Upper/Lower') {
          workout += i % 2 !== 0
            ? `- Bench Press: 4x8\n- Pull-ups: 4xMax\n- Barbell Rows: 4x10\n- Shoulder Press: 3x12\n`
            : `- Squats: 4x8\n- Deadlift: 4x6\n- Leg Press: 4x12\n- Calf Raises: 3x20\n`;
        } else if (splitType === 'Push/Pull/Legs') {
          const dayMod = (i - 1) % 3;
          workout += dayMod === 0
            ? `- Bench Press: 4x8\n- Shoulder Press: 3x12\n- Tricep Dips: 3x15\n`
            : dayMod === 1
              ? `- Pull-ups: 4xMax\n- Barbell Rows: 4x10\n- Bicep Curls: 3x12\n`
              : `- Squats: 4x8\n- Deadlift: 4x6\n- Leg Press: 4x12\n- Calf Raises: 3x20\n`;
        }
      } else if (equipment === 'dumbbells') {
        workout += `- Dumbbell Squats: 4x12\n- Dumbbell Bench Press: 4x10\n- Dumbbell Rows: 4x12\n- Dumbbell Bicep Curls: 3x15\n`;
      } else if (equipment === 'kettlebell') {
        workout += `- Kettlebell Swings: 4x15\n- Goblet Squats: 4x12\n- Kettlebell Rows: 4x12\n- Kettlebell Overhead Press: 3x12\n`;
      } else if (equipment === 'resistance_bands') {
        workout += `- Band Squats: 4x15\n- Band Chest Press: 4x12\n- Band Rows: 4x12\n- Band Bicep Curls: 3x15\n`;
      } else {
        workout += `- Bodyweight Squats: 4x20\n- Push-ups: 4x15\n- Plank: 3x60s\n- Lunges: 3x15/leg\n`;
      }
    } else if (goal === 'fat') {
      workout += `- Jump Rope: 10 min\n- Push-ups: 4x12\n- Bodyweight Squats: 4x15\n- Mountain Climbers: 3x20\n- Plank: 3x60s\n`;
    } else {
      workout += `- Full Body Circuit: 3 rounds\n   - Push-ups 12 reps\n   - Bodyweight Squats 15 reps\n   - Dumbbell Rows 12 reps\n   - Plank 60s\n- Light Cardio: 15 min\n`;
    }

    workout += '\n';
  }

  let nutrition = `🍽️ Nutrition Plan for ${username}:\n\n`;
  if (goal === 'muscle') {
    nutrition += `Breakfast: Oatmeal with milk, banana, peanut butter, protein powder\n`;
    nutrition += `Lunch: Grilled chicken, brown rice, steamed broccoli\n`;
    nutrition += `Snack: Greek yogurt with nuts\n`;
    nutrition += `Dinner: Salmon, sweet potato, green beans\n`;
    nutrition += `Snack: Cottage cheese with berries\n`;
  } else if (goal === 'fat') {
    nutrition += `Breakfast: Egg whites, spinach, whole wheat toast\n`;
    nutrition += `Lunch: Turkey breast salad with olive oil\n`;
    nutrition += `Snack: Protein shake with water\n`;
    nutrition += `Dinner: Grilled fish, zucchini noodles, mixed veggies\n`;
    nutrition += `Snack: Carrot sticks or cucumber\n`;
  } else {
    nutrition += `Breakfast: Smoothie (banana, protein powder, almond milk)\n`;
    nutrition += `Lunch: Chicken wrap with veggies\n`;
    nutrition += `Snack: Apple with peanut butter\n`;
    nutrition += `Dinner: Stir-fried tofu and vegetables with brown rice\n`;
    nutrition += `Snack: Yogurt or nuts\n`;
  }

  const tips = `💡 Training & Nutrition Tips:\n`;
  let tipsContent = '';
  if (goal === 'muscle') {
    tipsContent += '- Progressive overload: increase weight or reps every week\n';
    tipsContent += '- Eat a protein-rich meal within 1h post-workout\n';
    tipsContent += '- Focus on compound lifts (squat, deadlift, bench)\n';
    tipsContent += '- Rest 48h between heavy sessions for same muscle group\n';
  } else if (goal === 'fat') {
    tipsContent += '- Combine strength and cardio for fat loss\n';
    tipsContent += '- Maintain a calorie deficit\n';
    tipsContent += '- Drink plenty of water and high-fiber meals\n';
    tipsContent += '- Track workouts to improve consistency\n';
  } else {
    tipsContent += '- Maintain consistency over intensity\n';
    tipsContent += '- Focus on balanced diet and daily movement\n';
    tipsContent += '- Gradually increase training volume\n';
  }
  tipsContent += '- Warm up and cool down each session\n';
  tipsContent += '- Track your progress weekly\n';
  tipsContent += '- Sleep 7-9 hours per night\n';

  output.innerHTML = `<pre>${workout}\n${nutrition}\n${tips}${tipsContent}</pre>`;

  if (!document.querySelector('#save-btn')) {
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn';
    saveBtn.textContent = 'Save Plan as TXT';
    saveBtn.style.marginTop = '10px';
    output.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
      const blob = new Blob([`${workout}\n${nutrition}\n${tips}${tipsContent}`], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${username}_trainia_plan.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }
});
